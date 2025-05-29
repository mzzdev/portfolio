import { Separator } from "@/components/ui/separator"

export default function Section({ id, title, children, contentClassName, bodyClassName, }: {
  id: string
  title: string
  children: React.ReactNode
  contentClassName?: string
  bodyClassName?: string
}) {
  return (
    <section
      id={id}
      className="section h-[50vh] w-full px-4 pt-4 last:pb-4 bg-neutral-200"
    >
      <div className={`h-full w-full border-black border-[1px] bg-white ${contentClassName}`}>
        <h2 className="font-jbmono text-3xl p-4 leading-tight tracking-tight uppercase pointer-events-none">
          {title}
        </h2>
        <Separator className="bg-black" />
        <div className={`text-lg ${bodyClassName}`}>{children}</div>
      </div>
    </section>
  );
}
