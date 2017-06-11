
      //---------Controller--------
export default function Controller(view, model) {
	var self = this;

	function columnEventHandler(event) {
		if ( !$(event.target).hasClass('column-event')) return;
		event.stopPropagation();
		let columnDate = $(event.target).attr('data-date');

		$('.datepicker-startDate').datepicker('update', columnDate);
		$('.datepicker-endDate').datepicker('update', columnDate);
		view.elements.startDate.val(columnDate);
		view.elements.endDate.val(columnDate);
		view.elements.startTime.val("09:00");
		view.elements.endTime.val("10:00");
		view.elements.eventText.val('');
		
		view.elements.myModal.modal("show");
	}

	function addEvent(event) {
		event.preventDefault(); //prevent submit form
		var newEvent = {
			"id": new Date().getTime(),
			"text": view.elements.eventText.val(), 
			"startDate": view.elements.startDate.val() + ' ' + view.elements.startTime.val(),
			"endDate": view.elements.endDate.val() + ' ' + view.elements.endTime.val()
		}; 

		if ( view.elements.myModal.hasClass('data-edit') ) { 
				newEvent.id = view.elements.myModal.attr('data-eventId');
				model.editEvent(newEvent);
				view.elements.myModal.toggleClass('data-edit');
			}

			else model.addEvent(newEvent);

		gotoView({
			data: moment(newEvent.startDate)
		})

		removeEventListeners();
		view.renderView(model);
		initEventColumnListeners();
		view.elements.myModal.modal("hide");

		//we clean event edit input fields
		view.elements.eventText.val('');
		view.elements.startDate.val('');
		view.elements.endDate.val('');		
	}
	
	function removeEvent(event) {
		if ( !$(this).parent().hasClass('item-event')) return;
		event.stopPropagation();
		var eventId = $(this).parent().attr('data-id');
		model.removeEvent(eventId);
		removeEventListeners();		
		view.renderView(model);
		initEventColumnListeners();
	}

	function editEvent(event) {
		if ( !$(this).parent().hasClass('item-event')) return;
		event.stopPropagation();

		let eventId = $(this).parent().attr('data-id');		
		let myEvent = model.events.find(x => x.id == eventId); 

		$('.event-text').focus();
		view.elements.eventText.val(myEvent.text);
		
		let startDate = moment( myEvent.startDate ).format("YYYY-MM-DD");
		view.elements.startDate.val(startDate);
		let endDate = moment( myEvent.endDate ).format("YYYY-MM-DD");
		view.elements.endDate.val(endDate);

		let startTime = moment( myEvent.startDate ).format("hh:mm");
		view.elements.startTime.val(startTime);
		let endTime = moment( myEvent.endDate ).format("hh:mm");
		view.elements.endTime.val(endTime);
		view.elements.myModal.toggleClass('data-edit');
		view.elements.myModal.attr('data-eventId', eventId);
		view.elements.myModal.modal();
	}

	function gotoView(event) {
		let targetDate = event.data;
		model.changeCurrentDate( targetDate );
		removeEventListeners();
		view.renderView(model);
		initEventColumnListeners()
	}

	function todayView() {
		model.changeCurrentDate( moment() );
		removeEventListeners();
		view.renderView(model);
		initEventColumnListeners()
	}


	function prevView(  ) {
		var dateOld = model.currentDate;
		var dateNew = dateOld.subtract('7','days');
		model.changeCurrentDate( dateNew );
		removeEventListeners();
		view.renderView(model);
		initEventColumnListeners()
	}

	function nextView( ) {
		var dateOld = model.currentDate;
		var dateNew = dateOld.add('7','days');
		model.changeCurrentDate( dateNew );
		removeEventListeners();
		view.renderView(model);
		initEventColumnListeners()
	}

	function timeChangeHandler(event) {
		let startTimeVal =  view.elements.startTime.val();
		let endTimeVal =  view.elements.endTime.val();
		if ( $(event.target).attr('id') =='startTime' && startTimeVal > endTimeVal ) {
			console.log('startTime >  endTime');
			view.elements.endTime.val(startTimeVal);
		} else if ( $(event.target).attr('id') =='endTime' && startTimeVal > endTimeVal ) {
			view.elements.startTime.val(endTimeVal);
		}
	}

	function initEventColumnListeners() {
		view.elements.columnEvent.on('click', columnEventHandler);   
		view.elements.btnDeleteEvent.on('click', removeEvent);
		view.elements.btnEditEvent.on('click', editEvent);
		view.elements.itemEvent.on('mouseenter',
			function() { $(event.target).children('.glyphicon').css("display", "inline-block")} );
		view.elements.itemEvent.on('mouseleave',
		    function() { $(event.target).children('.glyphicon').css("display", "none");}	);		
	}

	function initEventBtnListeners() {
		view.elements.btnToday.on('click', todayView); 
		view.elements.btnPrev.on('click', prevView);
		view.elements.btnNext.on('click', nextView);
		$(document.forms.eventform).on('submit', addEvent);
		view.elements.startTime.on('change', timeChangeHandler);
		view.elements.endTime.on('change', timeChangeHandler);
		$('.input-daterange').datepicker({
			format: "yyyy-mm-dd",
			todayHighlight: true,
			maxViewMode: 2,
			autoclose: true,
			});

        view.elements.myModal.on('shown.bs.modal', () => {
			view.elements.eventText.focus();
    	});				

		// $('#myModal').on('shown.bs.modal', null, columnDate, 
		// 	(event) => { 
		// 	let startDate = event.data;
		// 	$('.event-text').focus();
		// 	$('.datepicker-startDate').datepicker('update', startDate);
		// 	$('.datepicker-endDate').datepicker('update', startDate);
		// 	view.elements.startDate.val(startDate);
		// 	view.elements.endDate.val(startDate);
		// });	

		//here is toolpit code for future
		// $('[data-toggle="popover"]').popover({
		// 	html: true,
		// 	content:`<div class="popover-event">
		// 				<h3>text</h3>
		// 				<div class="form-group">
		// 				  <label for="usr">Name:</label>
		// 				  <input type="text" class="form-control" id="usr">
		// 				</div>
		// 				<button type="button" class="btn btn-default">Close</button>
		// 				<button type="submit" class="btn btn-primary ">Save</button>
		// 			</div>`,
		// 	delay: { "show": 500, "hide": 100 },
		// 	trigger: 'hover',
		// 	container: 'body',
		// });		

		
	}

	function removeEventListeners() {
		view.elements.columnEvent.off('click');   
		view.elements.btnDeleteEvent.off('click');
		view.elements.btnEditEvent.off('click');
		view.elements.itemEvent.off('mouseenter');
		view.elements.itemEvent.off('mouseleave');					
	};

	initEventBtnListeners();
	initEventColumnListeners(); 
}      
