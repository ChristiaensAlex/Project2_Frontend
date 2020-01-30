let vandaag, vanillaCalendar;

document.addEventListener('DOMContentLoaded', () => {
  console.info('DOM loaded calendar.js');
  vanillaCalendar = {
    month: document.querySelectorAll('[data-calendar-area="month"]')[0],
    next: document.querySelectorAll('[data-calendar-toggle="next"]')[0],
    previous: document.querySelectorAll('[data-calendar-toggle="previous"]')[0],
    label: document.querySelectorAll('[data-calendar-label="month"]')[0],
    activeDates: null,
    date: new Date(),
    todaysDate: new Date(),

    init: function(options) {
      this.options = options;
      this.date.setDate(1);
      this.createMonth();
      this.createListeners();
    },

    createListeners: function() {
      var _this = this;
      this.next.addEventListener('click', function() {
        _this.clearCalendar();
        var nextMonth = _this.date.getMonth() + 1;
        _this.date.setMonth(nextMonth);
        _this.createMonth();
      });
      // Clears the calendar and shows the previous month
      this.previous.addEventListener('click', function() {
        _this.clearCalendar();
        var prevMonth = _this.date.getMonth() - 1;
        _this.date.setMonth(prevMonth);
        _this.createMonth();
      });
    },

    createDay: function(num, day, year) {
      if (num.toString().length == 1) {
        num = '0' + num.toString();
      }
      var newDay = document.createElement('div');
      var dateEl = document.createElement('span');
      dateEl.innerHTML = num;
      newDay.className = 'c-cal__date';
      newDay.setAttribute('data-calendar-date', this.date);
      dateShort = this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + this.date.getDate()).slice(-2);
      newDay.setAttribute('data-date', dateShort);

      // if it's the first day of the month
      if (num.toString() === '01') {
        if (day === 0) {
          newDay.style.marginLeft = 6 * 14 + '%';
        } else {
          newDay.style.marginLeft = (day - 1) * 14 + '%';
        }
      }

      newDay.classList.add('c-cal__date--active');
      newDay.setAttribute('data-calendar-status', 'active');

      if (this.date.toString() === this.todaysDate.toString()) {
        newDay.classList.add('c-cal__date--today');
        newDay.classList.add('c-cal__date--selected');
        vandaag = document.querySelector('.c-cal__date--today');
      }

      newDay.appendChild(dateEl);
      this.month.appendChild(newDay);
    },

    dateClicked: function() {
      var _this = this;

      this.activeDates = document.querySelectorAll('[data-calendar-status="active"]');
      for (var i = 0; i < this.activeDates.length; i++) {
        this.activeDates[i].addEventListener('click', function(event) {
          var picked = document.querySelectorAll('[data-calendar-label="picked"]')[0];
          _this.removeActiveClass();
          this.classList.add('c-cal__date--selected');
          DateClickedHandler(event);
        });
      }
    },

    createMonth: function() {
      var currentMonth = this.date.getMonth();
      while (this.date.getMonth() === currentMonth) {
        this.createDay(this.date.getDate(), this.date.getDay(), this.date.getFullYear());
        this.date.setDate(this.date.getDate() + 1);
      }
      // while loop trips over and day is at 30/31, bring it back
      this.date.setDate(1);
      this.date.setMonth(this.date.getMonth() - 1);

      this.label.innerHTML = this.monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear();
      this.dateClicked();
    },

    monthsAsString: function(monthIndex) {
      return ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'][monthIndex];
    },

    clearCalendar: function() {
      vanillaCalendar.month.innerHTML = '';
    },

    removeActiveClass: function() {
      for (var i = 0; i < this.activeDates.length; i++) {
        this.activeDates[i].classList.remove('c-cal__date--selected');
      }
    }
  };
});
