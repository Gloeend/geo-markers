import {SectionContainer} from "@shared/ui/section-container";
import {GeocodeForm, GeocodeList} from "@entities/geocode/ui";
import {GeocodeModal} from "@entities/geocode/ui/GeocodeModal.tsx";
import {Map} from "@widgets/map/ui";

export const Home = () => {

    return <SectionContainer className="flex flex-col justify-center items-center min-h-full">
        <GeocodeList/>
        <GeocodeForm/>
        <GeocodeModal/>
        <Map/>
    </SectionContainer>
}