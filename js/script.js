window.addEventListener("load", () => {
  ///henany elementa pewystakan laregay id
  const show_checked_btn = document.getElementById("show-checked");
  const show_unchecked_btn = document.getElementById("show-unchecked");
  const form = document.getElementById("new-task-form");
  const input = document.getElementById("new-task-input");
  const check = document.getElementById("task-checkbox");
  const list_el = document.getElementById("tasks");
  const counter = document.getElementById("counter");
  const err_msg = document.getElementById("fill-span");
  ///eventakan
  form.addEventListener("submit", (e) => {
    e.preventDefault(); //page aka refresh nabe
    const task = input.value; // nrxy naw inputaka akayna naw variable y task
    if (!task) {
      //dllnya abyn ka nrxy tyaya inputaka
      err_msg.style.visibility = "visible"; // massgek darakawe ka ale inputaka prr karawa
      setTimeout(() => {
        //pash chrkaw niwek massge aka dyarnamene
        err_msg.style.visibility = "hidden";
      }, 1500);
      return;
    }
    input.value = ""; // lera inputaka batal akaynawa
    ///lera elementakan drwstakayn bapey tag akay
    const task_el = document.createElement("div");
    const task_content_el = document.createElement("div");
    const task_content_checkbox = document.createElement("input");
    const task_content_text = document.createElement("input");
    const act = document.createElement("div");
    const del = document.createElement("button");
    const edit = document.createElement("button");
    ///class adayn ba elementakany drwsman krdwa
    task_el.classList.add("task");
    task_content_el.classList.add("content");
    task_content_text.classList.add("text");
    act.classList.add("act");
    del.classList.add("delete");
    edit.classList.add("edit");
    if (check.checked) {
      //dlnya abyn gar task aka tawaw krabet yan na, gar krabet task aka rek axayn
      task_content_text.classList.add("after-checked");
      task_content_checkbox.checked = true;
    }
    /// type adayn ba input y task akanw nwsynaka dakayn ba readonly
    task_content_checkbox.type = "checkbox";
    task_content_text.type = "text";
    task_content_text.setAttribute("readonly", true);
    ///nrx adayn bawanay pewystn
    task_content_text.value = task;
    del.innerHTML = "Delete";
    edit.innerHTML = "Edit";
    ///elementakan rek axayn bo jegay xoyan
    task_content_el.appendChild(task_content_checkbox);
    task_content_el.appendChild(task_content_text);
    act.appendChild(edit);
    act.appendChild(del);
    task_el.appendChild(task_content_el);
    task_el.appendChild(act);
    list_el.appendChild(task_el);
    ///chand eventeky tr
    task_content_checkbox.addEventListener("click", () => {
      if (!task_content_checkbox.checked) {
        task_content_text.classList.remove("after-checked");
        return;
      }
      task_content_text.classList.add("after-checked");
    });
    del.addEventListener("click", () => {
      task_el.remove();
      TaskCounter(counter, list_el.children.length);
    });
    edit.addEventListener("click", () => {
      if (edit.innerHTML == "Edit") {
        task_content_text.toggleAttribute("readonly");
        task_content_text.focus();
        if (task_content_checkbox.checked) {
          task_content_text.classList.remove("after-checked");
        }
        edit.innerHTML = "Save";
      } else {
        edit.innerHTML = "Edit";
        if (task_content_checkbox.checked) {
          task_content_text.classList.add("after-checked");
        }
        task_content_text.toggleAttribute("readonly");
      }
    });
    TaskCounter(counter, list_el.children.length); ///zhmardny task akan
  });
  ////// dwgmay show-checked
  show_checked_btn.addEventListener("click", () => {
    ch_unch_btn(list_el, show_checked_btn, show_unchecked_btn, 1, counter);
  });
  ///// dwgmay show-unchecked
  show_unchecked_btn.addEventListener("click", () => {
    ch_unch_btn(list_el, show_unchecked_btn, show_checked_btn, 2, counter);
  });
});
///functions
function TaskCounter(Counter, num) {
  Counter.innerHTML = num + " item(s)";
}
function ch_unch_btn(list_el, btn1, btn2, j, counter) {
  var i = list_el.childNodes.length;
  list_el.childNodes.forEach((node) => {
    if (
      j == 1
        ? !node.firstChild.firstChild.checked
        : node.firstChild.firstChild.checked
    ) {
      if (node.style.display != "none") {
        node.style.display = "none";
        btn1.innerHTML = "show-all";
        btn2.disabled = true;
        i--;
      } else {
        node.style.display = "block";
        btn1.innerHTML = j == 1 ? "show-checked" : "show-unchecked";
        btn2.disabled = false;
      }
    }
  });
  TaskCounter(counterf, i);
}
