interface SectionProps {
  id: string
  className?: string
  children: React.ReactNode
}

interface SectionCardProps {
  className?: string
  children: React.ReactNode
}

interface SectionHeaderProps {
  children: React.ReactNode
}

interface SectionBodyProps {
  className?: string
  children: React.ReactNode
}

export default function Section({ id, className = '', children }: SectionProps) {
  return (
    <section
      id={id}
      className={`section bg-white ${className || 'md:w-4xl w-auto md:mx-auto mx-[5vw] pb-4'}`}
    >
      {children}
    </section>
  );
}

Section.Card = function SectionCard({ className = '', children }: SectionCardProps) {
  return (
    <div className={`w-full border-standard bg-white ${className}`}>
      {children}
    </div>
  );
};

Section.Header = function SectionHeader({ children }: SectionHeaderProps) {
  return (
    <>
      <h2 className="font-jbmono text-xl border-bottom-standard uppercase p-6">
        {children}
      </h2>
    </>
  );
};

Section.Body = function SectionBody({ className = '', children }: SectionBodyProps) {
  return (
    <div className={`text-base ${className}`}>
      {children}
    </div>
  );
};
