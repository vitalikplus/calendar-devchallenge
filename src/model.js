	// ----Model---
export default function Model(events, currentDate) {
	var self = this;
	self.events = events;
	self.currentDate = currentDate; 

	self.weekDaysName = ['Sun', 'Mn', 'Tue', 'Wed', 'Th', 'Fr', 'Sat']; 

	self.addEvent = function (newEvent) {
		
		if (newEvent.length === 0) { return;}
		self.events.push(newEvent);
		updateLocalStorage();
		return self.events;
	}	

	self.editEvent = function (newEvent) {
		if (newEvent.length === 0) { return;}

		let index = self.events.findIndex(x => newEvent.id == x.id);
		self.events.splice(index, 1, newEvent);

		updateLocalStorage();
		return self.events;		
	}
	
	self.removeEvent = function (eventId) {
		var index; 
		self.events.forEach(
			(elem, ind) => {
				if ( eventId==elem.id ) {
					index = ind;
					return;
				}
			});
		if (index === -1 || !index) { return; } 

		self.events.splice(index, 1);
		updateLocalStorage();
		return self.events;
	}

	self.changeCurrentDate = function (date) {
		self.currentDate = date;
		updateLocalStorage();
	}

	function updateLocalStorage() {
		var events = JSON.stringify(self.events);
		localStorage.setItem('events', events)
		localStorage.setItem('currentDate', self.currentDate.format('YYYY-MM-DD HH:mm'));
	}

	function getInitialLocalStorage() {
		var events = localStorage.getItem('events');
		if (events) self.events = JSON.parse(events);
		var currentDate = localStorage.getItem('currentDate');
		if (currentDate) self.currentDate = moment(currentDate, 'YYYY-MM-DD');
	}

	getInitialLocalStorage();
}
