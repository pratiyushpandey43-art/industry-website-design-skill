import { MapPin, Phone } from "@/components/icons";
import { site } from "@/lib/site";

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/97 backdrop-blur-md lg:hidden">
      <div className="mx-auto grid max-w-xl grid-cols-2 gap-2 px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
        <a
          href={`tel:${site.phone.tel}`}
          className="btn btn-outline min-h-[48px] text-[0.6875rem]"
          aria-label={`Call ${site.name} at ${site.phone.display}`}
        >
          <Phone className="h-4 w-4" />
          Call Now
        </a>
        <a
          href={site.directionsUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary min-h-[48px] text-[0.6875rem]"
        >
          <MapPin className="h-4 w-4" />
          Get Directions
        </a>
      </div>
    </div>
  );
}
