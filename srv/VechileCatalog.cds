using  {vechile} from './external/vechile';
using {wcm} from './external/wcm';
using {sap.eam as vechileext} from '../db/table';

service vechileCatalog {
    @cds.persistence.exists
    @cds.autoexpose
    entity VechileInformation as select from vechile.VechileInformation;
    @cds.persistence.exists
    @cds.autoexpose
    @cds.persistence.skip
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
    @cds.persistence.exists
    @cds.autoexpose
    entity CertificateType as select from wcm.CertificateType_V4;
    @cds.persistence.exists
    @cds.autoexpose
    entity SafetyCertificate_VH as select from wcm.SafetyCertificateVH_V4;
}

service vechileExtension{
    entity Vechile_Active as select from vechileext.vechile_active;
}