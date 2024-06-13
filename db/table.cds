using {managed} from '@sap/cds/common';


context sap.eam {
   entity vechile_active {
      key id       : UUID not null;
          active   : Boolean
   }
}