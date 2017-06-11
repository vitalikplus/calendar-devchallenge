import Model from './model';
import View from './view';
import Controller from './controller';

      //-----------Main Code-------- 

var firstEvents = [
{id:1, text:"Meeting",   startDate:"2017-06-04 14:00",endDate:"2017-06-04 14:00"},
{id:2, text:"Conference",startDate:"2017-06-04 12:00",endDate:"2017-06-04 12:00"},
{id:3, text:"Interview", startDate:"2017-06-04 09:00",endDate:"2017-06-04 09:00"},
{id:4, text:"Interview2", startDate:"2017-06-05 09:00",endDate:"2017-06-05 09:00"},
{id:5, text:"Interview3", startDate:"2017-06-07 09:00",endDate:"2017-06-07 09:00"},
];

var model = new Model(firstEvents,moment());
var view = new View(model);
var controller = new Controller(view, model);
