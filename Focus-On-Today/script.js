const checkBoxList = document.querySelectorAll(".checkBox");
const inputFields = document.querySelectorAll(".goalInput");
const errorLabel = document.querySelector(".errorLabel");
const ProgressLabel = document.querySelector(".progLabel");
const progressBar = document.querySelector(".progBar");
const progressValue = document.querySelector(".progVal");

const allQuotes=[
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just 2 more step, keep going!',
    'Almost there!!',
    'Whoa! You just completed all the goals, time for chill :D',
]

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
    first:{
        name:'',
        completed: false,
    },
    second:{
        name:'',
        completed: false,
    },
    third:{
        name:'',
        completed: false,
    },
    fourth:{
        name:'',
        completed: false,
    },
};
let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length;


progressValue.style.width = `${(completedGoalsCount / inputFields.length) * 100}%`;
progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} completed`;
ProgressLabel.innerText=allQuotes[completedGoalsCount]

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const allGoalsAdded = [...inputFields].every(function (input) {
      return input.value;
    });

    if (allGoalsAdded) {
      checkbox.parentElement.classList.toggle("completed");

      const inputId = checkbox.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;
      progressValue.style.width = `${(completedGoalsCount/inputFields.length) * 100}%`;
      progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} completed`;
      ProgressLabel.innerText=allQuotes[completedGoalsCount]
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      progressBar.classList.add("showError");
    }
  });
});

inputFields.forEach((input) => {
  input.value = allGoals[input.id].name;

  if (allGoals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }

  input.addEventListener("focus", () => {
    progressBar.classList.remove("showError");
  });

  input.addEventListener("input", (e) => {
    if (allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    }

    allGoals[input.id] = {
      name: input.value,
      completed: false,
    };

    // console.log(allGoals);
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
