// IMPORTS
import $ from 'jquery';
import UserRepository from '../src/UserRepository';
import User from '../src/User';
import Sleep from '../src/Sleep';
import Activity from '../src/Activity';
import Hydration from '../src/Hydration';

let domUpdates = {

// BASIC DOM DISPLAY METHODS
  displayInitialDomData(user, todayDate, userRepository) {
    this.updateTrendingStairsDays(user);
    this.updateTrendingStepDays(user);
    this.displayFriendsTotalSteps(user, todayDate, userRepository);
    this.displayDropdownInfo(user);

    $('.user-id-js').text(`${user.id}`);

    $('#sleep-friend-longest-sleeper').text(userRepository.users.find(user => {
      return user.id === userRepository.getLongestSleepers(todayDate)
    }).getFirstName());

    $('#sleep-friend-worst-sleeper').text(userRepository.users.find(user => {
      return user.id === userRepository.getWorstSleepers(todayDate)
    }).getFirstName());

    $('#sleep-info-hours-average-alltime').text(user.hoursSleptAverage);

    $('#sleep-info-quality-average-alltime').text(user.sleepQualityAverage);
  },

  flipCard(cardToHide, cardToShow) {
    $(cardToHide).addClass('hide');
    $(cardToShow).removeClass('hide')
  },

  displayDropdownInfo(user) {
    $('#dropdown-goal').text(`DAILY STEP GOAL | ${user.dailyStepGoal}`);
    $('#dropdown-email').text(`EMAIL | ${user.email}`);
    $('#dropdown-name').text(user.name.toUpperCase());
    $('#header-name').text(`${user.getFirstName()}'S `);
  },

  showUserDropdown() {
    $('#user-info-dropdown').toggle('hide');
  },

  showActivityDropdown() {
    $('#add-data-dropdown').toggle('hide');
  },

  updateTrendingStairsDays(user) {
    user.findTrendingStairsDays();
    $('.trending-stairs-phrase-container').html(`<p class='trend-line'>${user.trendingStairsDays[0]}</p>`);
  },

  updateTrendingStepDays(user) {
    user.findTrendingStepDays();
    $('.trending-steps-phrase-container').html(`<p class='trend-line'>${user.trendingStepDays[0]}</p>`);
  },

  displayFriendsTotalSteps(user, todayDate, userRepository) {
    user.findFriendsTotalStepsForWeek(userRepository.users, todayDate);
    user.friendsActivityRecords.forEach(friend => {
      $('#dropdown-friends-steps-container').append(`
    <p class='dropdown-p friends-steps'>${friend.firstName} |  ${friend.totalWeeklySteps}</p>
    `);
    });
  },

// ACTIVITY METHODS
  displayAverageMinutesActiveThisWeek(allMinutes) {
    $('#steps-calendar-total-active-minutes-weekly').text(allMinutes);
  },

  displayAllActiveMinutesToday(minutesActive) {
    $('#steps-friend-active-minutes-average-today').text(minutesActive)
  },

  displayAverageMinutesActiveToday(averageMinutes) {
    $('#steps-info-active-minutes-today').text(averageMinutes);
  },

  displayMilesWalkedToday(milesWalked) {
    $('#steps-info-miles-walked-today').text(milesWalked);
  },

// STEPS METHODS
  displayTotalStepsThisWeek(totalSteps) {
    $('#steps-calendar-total-steps-weekly').text(totalSteps);
  },

  displayAllAverageStepGoal(averageStepsGoal) {
    $('#steps-friend-average-step-goal').text(averageStepsGoal);
  },

  displayAllAverageStepsToday(averageStepsToday) {
    $('#steps-friend-steps-average-today').text(averageStepsToday);
  },

  displayTotalStepsToday(totalSteps) {
    $('#steps-user-steps-today').text(totalSteps);
  },

// STAIRS METHODS
  displayAverageFlightsThisWeek(averageFlights) {
    $('#stairs-calendar-flights-average-weekly').text(averageFlights)
  },

  displayAllAverageFlightsToday(averageFlights) {
    $('#stairs-friend-flights-average-today').text(averageFlights);
  },

  displayAverageStairsThisWeek(averageStairs){
    $('#stairs-calendar-stairs-average-weekly').text(averageStairs);
  },

  displayTotalFlightsToday(totalFlights) {
    $('#stairs-info-flights-today').text(totalFlights);
  },

  displayTotalStairsToday(totalStairs) {
    $('#stairs-user-stairs-today').text(totalStairs);
  },

// HYDRATION METHODS
  displayAllAverageOuncesToday(averageOunces) {
    $('#hydration-friend-ounces-today').text(averageOunces);
  },

  displayTotalOuncesToday(totalOunces) {
    $('#hydration-user-ounces-today').text(totalOunces);
  },

// SLEEP METHODS
  displayAverageHourlySleepThisWeek(averageHourly) {
    $('#sleep-calendar-hours-average-weekly').text(averageHourly);
  },

  displayAverageSleepQualityThisWeek(averageQuality) {
    $('#sleep-calendar-quality-average-weekly').text(averageQuality);
  },

  displaySleepQualityToday(qualityToday) {
    $('#sleep-info-quality-today').text(qualityToday);
  },

  displayHoursSleepToday(hoursSlept) {
    $('#sleep-user-hours-today').text(hoursSlept);
  },
}

export default domUpdates;
