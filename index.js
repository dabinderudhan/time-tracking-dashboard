const daily = document.getElementById("daily");
const weekly = document.getElementById("weekly");
const monthly = document.getElementById("monthly");

const [...currentHours] = document.querySelectorAll(
  ".card-details--hours_current"
);
const [...previousHours] = document.querySelectorAll(".previous");
const [...previousTimeframe] = document.querySelectorAll(".previous-timeframe");

// fetch the data from local json file and store in data variable.
async function fetchData() {
  const response = await fetch("./data.json");
  const data = await response.json();
  return data;
}

// function to load hours on the page.
function loadHours(curPrevTimeframe, activity, timeframe) {
  curPrevTimeframe.innerText = `${
    activity.timeframes[timeframe.id][curPrevTimeframe.dataset.class]
  }${
    activity.timeframes.daily.current > 1 ||
    activity.timeframes.daily.current === 0
      ? "hrs"
      : "hr"
  }`;
}

async function loadData(timeframe) {
  const data = await fetchData();

  currentHours.map((current, index) => {
    const activity = data[index];
    loadHours(current, activity, timeframe);
  });

  previousHours.map((previous, index) => {
    const activity = data[index];
    loadHours(previous, activity, timeframe);
  });

  // timeframe.classList.add("active");
}

window.addEventListener("DOMContentLoaded", function () {
  loadData(daily);
  daily.classList.add("active");
});

const navList = document.querySelectorAll(".card-user--period_item");

navList.forEach((item) => {
  item.addEventListener("click", function (e) {
    loadData(e.target);

    if (e.target.id === "daily") {
      previousTimeframe.map((item) => (item.innerText = "Yesterday"));
      weekly.classList.remove("active");
      monthly.classList.remove("active");
      e.target.classList.add("active");
    }

    if (e.target.id === "weekly")
      previousTimeframe.map((item) => (item.innerText = "Last week"));
    daily.classList.remove("active");
    monthly.classList.remove("active");
    e.target.classList.add("active");

    if (e.target.id === "monthly")
      previousTimeframe.map((item) => (item.innerText = "Last month"));
    weekly.classList.remove("active");
    daily.classList.remove("active");
    e.target.classList.add("active");
  });
});
