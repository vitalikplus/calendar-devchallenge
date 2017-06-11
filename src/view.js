	// ----View----

export default function View(model) {
	var self = this;

	function init() { 
		//we render unchangeble part = skeleton
		var wrapper = $( templateWrapper(model) );
		$('body').append(wrapper);

		self.elements = {
			 btnToday: $('.nav-button__today'),
			 btnPrev: $('.nav-button__prev'),
			 btnNext: $('.nav-button__next'),
			 calendarColumns: $('.body-columns'),
			 calendarRows: $('.body-rows'),
			 currentDate: $('.current-date'),
			 startDate: $('.datepicker-startDate'),
			 endDate: $('.datepicker-endDate'),
			 startTime: $('.dropdown-startTime'),
			 endTime: $('.dropdown-endTime'),
			 saveEvent: $('.btn-saveEvent'),
			 eventText: $('.event-text'),
			 myModal: $('#myModal')
			}
		self.renderView(model);
	};

	self.renderView = function(model) {
		//we render week view rows
		var calendarRows = templateHourRows()
		self.elements.calendarRows.html ( calendarRows );

		//we render week view columns
		var calendarColumns = templateWeekDays(model);
		self.elements.calendarColumns.html ( calendarColumns );


		$.extend(self.elements, {
			columnEvent: $('.column-event'),
		} );

		//we render events
		renderEvents(self.elements.columnEvent, model);

		//we render curret date h2
		self.elements.currentDate.html(model.currentDate.format('Do MMM YYYY'));
	}


	// function templateList(model) {
	// 	var html = '';
	// 	for (var i = 0; i < model.data.length; i++) {
	// 		html += `<li> ${ model.data[i] } <span class="item-delete" data-value="${ model.data[i] }">  x </span></li>`;
	// 	}
	// 	return html;
	// }

	function templateWrapper(model) {
		var html = 
		`<div class="calendar">
			<div class="calendar-nav nav">
				<div class="left">
					<div class="btn-group" role="group" aria-label="buttons today, prev, next">
						<button type="button" class="btn btn-success nav-button__today">Today</button>
						<button type="button" class="btn btn-info nav-button__prev" >
							Previous
						</button>
						<button type="button" class="btn btn-primary nav-button__next">
							Next
						</button>
					</div>
					<h2 class="current-date">${ model.currentDate.format('Do MMM YY') }</h2>
				</div>
				<div class="right">
					<p>In order to create Event click on day colum</p>
				</div>
			</div>
			<div class="calendar-body body">
				<div class="body-rows">
				</div>
				<div class="body-columns">
				</div>
			</div>
		</div>`		

		return html; 
	}

	function templateWeekDays(model) {
		var html = '';
		var startDate = Number (model.currentDate.startOf('week').format('D'));
		var weekDayCounter = moment( model.currentDate.startOf('week'));
		
		var todayIsHere = moment(model.currentDate).isSame( moment(), 'week' )
		var today = Number(moment().format('D'));
		var nowClass = '';

		for (var i = 0; i < 7; i++) {
			if (todayIsHere) {
				if ( today === ( startDate + i )  ) nowClass = 'now';
			};

			html += `
				<div class="column">
					<div class="column-header ${nowClass} ">
						<p>
							${ model.weekDaysName[i] } ${startDate+i}
						</p>
					</div>
					<div class="column-content ${nowClass} ">
						<div class="column-event"
							 data-date="${weekDayCounter.format('YYYY-MM-DD')}" >
						</div>
					</div>
	 		
			 	 </div>`;
			 nowClass = '';
			 weekDayCounter.add('1','day');
		}

		return html;		
	}

	function templateHourRows() {
		var html = '';
		for (var i = 0; i < 25; i++) {
			var hour;
			i===0 ? hour = "" : hour = i-1 + ':00'; 
			html += `
				<div class="row-hour">${hour}
					<div class="row-semihour"></div>
				</div>`	
		}
		return html;
	}

	//empty function for now
	function templatePopover(model){
		var html=''
		retun;
	}

	function renderEvents(elements, model) {

		var eventIsHere; 
		var html='';
		var startTime;
		var endTime;
		var weekDayCounter = moment(model.currentDate.startOf('week'));
		for (var j = 0; j <= 6; j++) {
			for (var i = 0; i < model.events.length; i++) {
				eventIsHere = moment(model.events[i].startDate).isSame(weekDayCounter, 'day');
				startTime = moment(model.events[i].startDate).format('hh:mm');
				endTime = moment(model.events[i].endDate).format('hh:mm');
				if (eventIsHere) {
					html += `
					<div class="item-event"
						data-id="${model.events[i].id}"  >
						<span class="glyphicon glyphicon-pencil event-btn-edit" aria-hidden="true"></span>
						<span class="glyphicon glyphicon-remove event-btn-delete" aria-hidden="true"></span>
						<p>${startTime} - ${endTime}</p>
						<p class="item-event-text">${model.events[i].text}</p>
					</div>`
				}
				elements[j].innerHTML = html;
			}
			weekDayCounter.add('1','day');
			html='';
		};
		$.extend(self.elements, {
			itemEvent: $('.item-event'),
			btnDeleteEvent: $('.event-btn-delete'),
			btnEditEvent: $('.event-btn-edit')
		} );		
	}

	init();
}