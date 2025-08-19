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
      className="section w-full px-6 pt-4 last:pb-4 bg-transparent"
    >
      <div className="container mx-auto shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)]">
        <div className={`w-full min-h-[25vh] border-black border-[1px] bg-white ${contentClassName}`}>
          <h2 className="font-jbmono text-2xl p-6 leading-tight tracking-tight uppercase pointer-events-none">
            {title}
          </h2>
          <Separator className="bg-black" />
          <div className={`text-base ${bodyClassName}`}>{children}</div>
        </div>
      </div>
    </section>
  );
}
