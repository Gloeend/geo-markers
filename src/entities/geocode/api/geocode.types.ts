export interface IGetGeocodeDTO {
    apikey: string;
    geocode: string;
    format: "json";
}

export interface IGetGeocodeResponse {
    response: Response
}

export interface Response {
    GeoObjectCollection: GeoObjectCollection
}

export interface GeoObjectCollection {
    metaDataProperty: MetaDataProperty
    featureMember: FeatureMember[]
}

export interface MetaDataProperty {
    GeocoderResponseMetaData: GeocoderResponseMetaData
}

export interface GeocoderResponseMetaData {
    request: string
    results: string
    found: string
}

export interface FeatureMember {
    GeoObject: GeoObject
}

export interface GeoObject {
    metaDataProperty: MetaDataProperty2
    name: string
    description: string
    boundedBy: BoundedBy
    uri: string
    Point: Point
}

export interface MetaDataProperty2 {
    GeocoderMetaData: GeocoderMetaData
}

export interface GeocoderMetaData {
    precision: string
    text: string
    kind: string
    Address: Address
    AddressDetails: AddressDetails
}

export interface Address {
    country_code: string
    formatted: string
    Components: Component[]
}

export interface Component {
    kind: string
    name: string
}

export interface AddressDetails {
    Country: Country
}

export interface Country {
    AddressLine: string
    CountryNameCode: string
    CountryName: string
    AdministrativeArea: AdministrativeArea
}

export interface AdministrativeArea {
    AdministrativeAreaName: string
    SubAdministrativeArea: SubAdministrativeArea
}

export interface SubAdministrativeArea {
    SubAdministrativeAreaName: string
    Locality: Locality
}

export interface Locality {
    DependentLocality: DependentLocality
}

export interface DependentLocality {
    DependentLocalityName: string
    DependentLocality: DependentLocality2
}

export interface DependentLocality2 {
    DependentLocalityName: string
    Thoroughfare: Thoroughfare
}

export interface Thoroughfare {
    ThoroughfareName: string
    Premise: Premise
}

export interface Premise {
    PremiseNumber: string
}

export interface BoundedBy {
    Envelope: Envelope
}

export interface Envelope {
    lowerCorner: string
    upperCorner: string
}

export interface Point {
    pos: string
}
