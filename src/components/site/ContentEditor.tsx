import { useState } from "react";
import { Plus, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const field = "w-full min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
const labels: Record<string, string> = { groupSize: "Group size", age: "Age recommendation", src: "Video address", image: "Image address", heroImage: "Home page image", q: "Question", a: "Answer", bestFor: "Best for", href: "Link", packagesIntro: "Package introduction", packagesDisclaimer: "Package disclaimer" };
export function ContentEditor({ value, onChange, name = "" }: { value: unknown; onChange: (value: unknown) => void; name?: string }) {
  const [uploading, setUploading] = useState(false);
  const label = labels[name] ?? name.replace(/([A-Z])/g, " $1");
  if (typeof value === "boolean") return <label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={value} onChange={e => onChange(e.target.checked)} />{label}</label>;
  if (value === null || typeof value === "number") return <label className="block text-sm">{label}<input className={field} type="number" min="0" max="5" value={value ?? ""} onChange={e => onChange(e.target.value === "" ? null : Number(e.target.value))} /></label>;
  if (typeof value === "string") {
    const media = ["src", "image", "heroImage"].includes(name);
    const locked = ["slug", "id"].includes(name);
    async function upload(file: File | undefined) {
      if (!file) return;
      if (!file.type.startsWith("image/") && file.type !== "video/mp4" && file.type !== "video/webm") { toast.error("Choose an image, MP4, or WebM file."); return; }
      if (file.size > 50 * 1024 * 1024) { toast.error("Choose a file under 50 MB."); return; }
      setUploading(true);
      const path = `${crypto.randomUUID()}.${file.name.split(".").pop()?.replace(/[^a-z0-9]/gi, "") || "file"}`;
      const { error } = await supabase.storage.from("site-media").upload(path, file, { contentType: file.type });
      setUploading(false);
      if (error) { toast.error("The file could not be uploaded."); return; }
      onChange(`media:${path}`);
      toast.success("File uploaded. Save changes to publish it.");
    }
    return <label className="block min-w-0 space-y-2 text-sm"><span className="capitalize text-muted-foreground">{label}</span>{["theme"].includes(name) ? <select className={field} value={value} onChange={e => onChange(e.target.value)}>{["horror", "classified", "genie"].map(v => <option key={v}>{v}</option>)}</select> : <textarea aria-label={label} className={field} rows={value.length > 100 || ["storyline", "a", "privacy", "terms"].includes(name) ? 4 : 2} value={value} readOnly={locked} onChange={e => onChange(e.target.value)} />}{media && <span className="flex flex-wrap items-center gap-3"><span className="relative"><Button type="button" variant="outline" size="sm" disabled={uploading}><Upload />{uploading ? "Uploading…" : "Upload file"}</Button><input aria-label={`Upload ${label}`} type="file" accept={name === "src" ? "video/mp4,video/webm" : "image/*"} disabled={uploading} className="absolute inset-0 w-full cursor-pointer opacity-0" onChange={e => void upload(e.target.files?.[0])} /></span>{value.startsWith("media:") && <span className="text-xs text-primary-glow">Uploaded file selected</span>}</span>}</label>;
  }
  if (Array.isArray(value)) return <div className="space-y-4">{value.map((item, index) => <div key={index} className="border-b border-border pb-4"><div className="mb-3 flex items-center justify-between"><span className="text-xs text-muted-foreground">{label} {index + 1}</span>{!["rooms", "packages", "values"].includes(name) && <Button title="Remove item" aria-label={`Remove ${label} ${index + 1}`} type="button" size="icon" variant="ghost" onClick={() => onChange(value.filter((_, i) => i !== index))}><Trash2 /></Button>}</div><ContentEditor value={item} name={typeof item === "string" ? label : ""} onChange={next => onChange(value.map((v, i) => i === index ? next : v))} /></div>)}{!["rooms", "packages", "values"].includes(name) && <Button type="button" variant="outline" onClick={() => onChange([...value, value[0] && typeof value[0] === "object" ? structuredClone(value[0]) : ""])}><Plus />Add {label || "item"}</Button>}</div>;
  if (value && typeof value === "object") return <div className="grid gap-5 sm:grid-cols-2">{Object.entries(value).map(([key, val]) => <div key={key} className={Array.isArray(val) || (val && typeof val === "object") || ["privacy", "terms", "storyline"].includes(key) ? "min-w-0 sm:col-span-2" : "min-w-0"}><ContentEditor name={key} value={val} onChange={next => onChange({ ...value, [key]: next })} /></div>)}</div>;
  return null;
}