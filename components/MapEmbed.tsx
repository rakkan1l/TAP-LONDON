type MapEmbedProps = {
  title?: string;
};

export default function MapEmbed({ title = "Central London map" }: MapEmbedProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-navy/10 bg-white shadow-premium">
      <iframe
        title={title}
        src="https://www.google.com/maps?q=Central%20London&z=12&output=embed"
        className="h-[420px] w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
