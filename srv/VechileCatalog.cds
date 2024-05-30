using  {vechile} from './external/vechile';
using {wcm} from './external/wcm';

service vechileCatalog {
    @cds.persistence.exists
    @cds.autoexpose
    entity VechileInformation as select from vechile.VechileInformation;
    @cds.persistence.exists
    @cds.autoexpose
    entity VechileVarinat as select from vechile.VechileVariant;
}

@protocol:'rest'
service vechileCatalogRest {
    entity VechileInformation as select from vechile.VechileInformation;
    entity VechileVarinat as select from vechile.VechileVariant;
}

service wcmCatalog{
     @cds.persistence.exists
    @cds.autoexpose
    entity SafetyCertificate as select from wcm.SafetyCertificate_V4;
}