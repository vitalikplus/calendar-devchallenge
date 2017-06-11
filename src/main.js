import Model from './model';
import View from './view';
import Controller from './controller';

      //-----------Main Code-------- 

var firstEvents = [
      {
            id:1,
            text:"Meeting",
            startDate: moment().startOf('week').format('YYYY-MM-DD hh:mm'),
            endDate: moment().startOf('week').add(1,'hour').format('YYYY-MM-DD hh:mm') 
      },
      {
            id:2,
            text:"Conference",
            startDate: moment().startOf('week').add(1,'hour').format('YYYY-MM-DD hh:mm') ,
            endDate: moment().startOf('week').add(3,'hour').format('YYYY-MM-DD hh:mm') 
      },
      {
            id:3,
            text:"Interview",
            startDate: moment().startOf('week').add(3,'hour').format('YYYY-MM-DD hh:mm') ,
            endDate: moment().startOf('week').add(4,'hour').format('YYYY-MM-DD hh:mm') 
      },
      {
            id:4,
            text:"Interview2",
            startDate: moment().startOf('week').add(1,'day').format('YYYY-MM-DD hh:mm') ,
            endDate: moment().startOf('week').add(1,'day').add(1,'hour').format('YYYY-MM-DD hh:mm') 
      },
      {     
            id:5,
            text:"Interview3",
            startDate: moment().startOf('week').add(3,'day').format('YYYY-MM-DD hh:mm') ,
            endDate: moment().startOf('week').add(3,'day').add(1,'hour').format('YYYY-MM-DD hh:mm') 
      },
];

var model = new Model(firstEvents,moment());
var view = new View(model);
var controller = new Controller(view, model);
