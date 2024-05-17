using  {vechile} from './external/vechile';

service vechileCatalog {
    
    entity VechileInfo as select from vechile.VechileInformation{
        VechileId,
        VechileVariantId,
        VechilePlateNumber,
        VariantName,
        vechile_chassis,
        Manufacturar,
        gear_type
    }

}