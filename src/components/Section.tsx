import { Separator } from "@/components/ui/separator"

export default function Section({ 
  id, 
  title, 
  children, 
  contentClassName, 
  bodyClassName,
  noFixedWidth = false 
}: {
  id: string
  title: string
  children: React.ReactNode
  contentClassName?: string
  bodyClassName?: string
  noFixedWidth?: boolean
}) {
  return (
    <section
      id={id}
      className={`section bg-white ${noFixedWidth ? '' : 'md:w-4xl w-auto md:mx-auto mx-[5vw] pb-4'}`}
    >
      <div className={`w-full border-black border-[1px] bg-white shadow-[0px_0px_8px_0px_rgba(0,_0,_0,_0.075)] ${contentClassName}`}>
        <h2 className="font-jbmono text-2xl p-6 leading-tight tracking-tight uppercase pointer-events-none">
          {title}
        </h2>
        <Separator className="bg-black" />
        <div className={`text-base ${bodyClassName}`}>{children}</div>
      </div>
    </section>
  );
}
