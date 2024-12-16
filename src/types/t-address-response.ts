export type TAddressResponse = {
  addresses: TAddress[];
  check_info: TCheckInfo;
  request_process_time: number;
};

export type TAddress = {
  areas: TAreas;
  codes: TCodes;
  country: TCountry;
  cover: TCover[];
  fields: TField[];
  geo_data: TGeoData;
  post_office: TPostOffice;
  stations: TStation[];
  time_zone: TTimeZone;
  pretty: string;
  quality: TQuality;
};

type TAreas = {
  admin_area: TAdminArea;
  admin_okrug: TAdminOkrug;
  ring_road: TRingRoad;
};

type TAdminArea = {
  name: string;
  type: string;
};

type TAdminOkrug = {
  name: string;
  type: string;
};

type TRingRoad = {
  in_ring: boolean;
  name: string;
  short: string;
};

type TCodes = {
  abr_actual_code: string;
  abr_detected_code: string;
  fias_actual_code: string;
  fias_house: string;
  fias_house_precise: boolean;
  fias_object: string;
  fias_object_level: string;
  gar_Region: string;
  gar_house: string;
  gar_object: string;
  ifns_fl: string;
  ifns_ul: string;
  kladr_actual_code: string;
  okato: string;
  oktmo: string;
  sign: string;
};

type TCountry = {
  code: string;
  name: string;
  sign: string;
};

type TCover = {
  in?: string;
  out?: string;
};

type TField = {
  c?: string;
  cover?: string;
  level: string;
  name?: string;
  ns?: number;
  ts?: number;
  type?: string;
};

type TGeoData = {
  house_level: string;
  max: TCoordinates;
  mid: TCoordinates;
  min: TCoordinates;
  object_level: string;
  rel: number;
};

type TCoordinates = {
  lat: number;
  lon: number;
};

type TPostOffice = {
  dist: number;
  lat: number;
  lon: number;
  pretty: string;
  sign: string;
};

type TStation = {
  dist: number;
  lat: number;
  line: string;
  lon: number;
  name: string;
  net: string;
  type: string;
};

type TTimeZone = {
  msk_zone: string;
  name: string;
  utc_zone: string;
};

type TQuality = {
  canonic_fields: number;
  detected_fields: number;
  precision: number;
  recall: number;
  verified_numeric_fields: number;
};

type TCheckInfo = {
  alts: number;
  query: string;
  time: number;
};
