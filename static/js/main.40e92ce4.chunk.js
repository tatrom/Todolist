(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{63:function(e,t,a){e.exports=a(78)},68:function(e,t,a){},69:function(e,t,a){},78:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),c=a(8),r=a.n(c);a(68),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(69);var l=a(26),o=a(119),u=a(109),s=a(110),d=i.a.memo((function(e){var t=Object(n.useState)(""),a=Object(l.a)(t,2),c=a[0],r=a[1],d=Object(n.useState)(null),m=Object(l.a)(d,2),f=m[0],b=m[1];console.log("Add item form");var E=function(){var t=c.trim();t?e.addItem(t):b("Title is required!!!"),r("")};return i.a.createElement("div",null,i.a.createElement(o.a,{value:c,label:"type value",onChange:function(e){null!==f&&b(null),r(e.currentTarget.value)},onKeyPress:function(e){"Enter"===e.key&&E()},error:!!f,helperText:f}),i.a.createElement(u.a,{onClick:E,color:"primary"},i.a.createElement(s.a,null)))})),m=i.a.memo((function(e){var t=Object(n.useState)(!1),a=Object(l.a)(t,2),c=a[0],r=a[1],u=Object(n.useState)(e.title),s=Object(l.a)(u,2),d=s[0],m=s[1];return c?i.a.createElement(o.a,{value:d,onBlur:function(){r(!1),d.trim()&&e.changeTaskTitle(d.trim())},autoFocus:!0,onChange:function(e){m(e.currentTarget.value)}}):i.a.createElement("span",{onDoubleClick:function(){return r(!0)}},e.title)})),f=a(112),b=a(111),E=a(20),O=a(27),v=a(14),T=a(38),k={},j=[],D=function(e,t){return{type:"CHANGE-FILTER",value:e,todoListID:t}},p=a(120),I=i.a.memo((function(e){var t=Object(n.useCallback)((function(t){e.changeTitle(t,e.task.id)}),[e.task.id,e.changeTitle]);return i.a.createElement("div",{key:e.task.id,className:e.task.isDone?"is-done":""},i.a.createElement(p.a,{onChange:function(t){return a=t.currentTarget.checked,void e.onChangeHandler(a,e.task.id);var a},checked:e.task.isDone}),i.a.createElement(m,{title:e.task.title,changeTaskTitle:t,taskId:e.task.id}),i.a.createElement(u.a,{onClick:function(){return e.onRemoveHandler(e.task.id)}},i.a.createElement(b.a,null)))})),h=i.a.memo((function(e){var t=Object(E.c)((function(t){return t.tasks[e.id]})),a=Object(E.b)(),c=Object(n.useCallback)((function(t){a(function(e,t){return{type:"ADD-TASK",title:e,todolistID:t}}(t,e.id))}),[a,e.id]),r=t;"active"===e.filter&&(r=t.filter((function(e){return!1===e.isDone}))),"completed"===e.filter&&(r=t.filter((function(e){return!0===e.isDone})));var l=Object(n.useCallback)((function(){return a(D("all",e.id))}),[a,e.id]),o=Object(n.useCallback)((function(){return a(D("active",e.id))}),[a,e.id]),s=Object(n.useCallback)((function(){return a(D("completed",e.id))}),[a,e.id]),O=Object(n.useCallback)((function(t){e.changeTodolistTitle(t,e.id)}),[]),v=Object(n.useCallback)((function(){e.removeTodoList(e.id)}),[]),T=Object(n.useCallback)((function(t){var n,i;a((n=t,i=e.id,{type:"REMOVE-TASK",taskID:n,todolistID:i}))}),[]),k=Object(n.useCallback)((function(t,n){var i,c;a((i=n,c=e.id,{type:"CHANGE-TASK-STATUS",id:i,todolistId:c,isDone:t}))}),[t]),j=Object(n.useCallback)((function(t,n){a(function(e,t,a){return{type:"CHANGE-TASK-TITLE",id:e,title:t,todolistId:a}}(n,t,e.id))}),[]);return i.a.createElement("div",null,i.a.createElement("h3",null,i.a.createElement(m,{title:e.title,changeTaskTitle:O}),i.a.createElement(u.a,{onClick:v},i.a.createElement(b.a,null))),i.a.createElement(d,{addItem:c}),i.a.createElement("div",null,r.map((function(e){return i.a.createElement(I,{changeTitle:j,onChangeHandler:k,onRemoveHandler:T,task:e})}))),i.a.createElement("div",null,i.a.createElement(f.a,{variant:"all"===e.filter?"contained":"text",onClick:l},"All"),i.a.createElement(f.a,{color:"primary",variant:"active"===e.filter?"contained":"text",onClick:o},"Active"),i.a.createElement(f.a,{color:"secondary",variant:"completed"===e.filter?"contained":"text",onClick:s},"Completed")))})),C=a(113),g=a(114),A=a(116),S=a(117),y=a(118),L=a(79),w=a(115);var H=function(){console.log("I am an App");var e=Object(E.c)((function(e){return e.todolists})),t=Object(E.b)(),a=Object(n.useCallback)((function(e,a){t(function(e,t){return{type:"CHANGE-TODOLIST-TITLE",title:t,id:e}}(a,e))}),[t]),c=Object(n.useCallback)((function(e,a){t(D(e,a))}),[t]),r=Object(n.useCallback)((function(e){t({type:"REMOVE-TODOLIST",todolistID:e})}),[t]),l=Object(n.useCallback)((function(e){t({type:"ADD-TODOLIST-TYPE",title:e,id:Object(T.v1)()})}),[t]);return i.a.createElement("div",{className:"App"},i.a.createElement(C.a,{position:"static"},i.a.createElement(g.a,null,i.a.createElement(u.a,{edge:"start",color:"inherit","aria-label":"menu"},i.a.createElement(w.a,null)),i.a.createElement(A.a,{variant:"h6"},"News"),i.a.createElement(f.a,{color:"inherit"},"Login"))),i.a.createElement(S.a,{fixed:!0},i.a.createElement(y.a,{container:!0,style:{padding:"20px"}},i.a.createElement(d,{addItem:l})),i.a.createElement(y.a,{container:!0,spacing:3},e.map((function(e){return i.a.createElement(y.a,{item:!0},i.a.createElement(L.a,{style:{padding:"10px"}},i.a.createElement(h,{key:e.id,id:e.id,title:e.title,filter:e.filter,removeTodoList:r,changeFilter:c,changeTodolistTitle:a})))})))))},N=a(32),K=Object(N.b)({tasks:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TASK":var a=Object(v.a)({},e),n=a[t.todolistID];return a[t.todolistID]=n.filter((function(e){return e.id!==t.taskID})),a;case"ADD-TASK":var i=Object(v.a)({},e),c={id:Object(T.v1)(),title:t.title,isDone:!1},r=e[t.todolistID];return i[t.todolistID]=[].concat(Object(O.a)(r),[c]),i;case"CHANGE-TASK-STATUS":var l=e[t.todolistId];return e[t.todolistId]=l.map((function(e){return e.id===t.id?Object(v.a)(Object(v.a)({},e),{},{isDone:t.isDone}):e})),Object(v.a)({},e);case"CHANGE-TASK-TITLE":var o=e[t.todolistId];return e[t.todolistId]=o.map((function(e){return e.id===t.id?Object(v.a)(Object(v.a)({},e),{},{title:t.title}):e})),Object(v.a)({},e);case"ADD-TODOLIST-TYPE":var u=Object(v.a)({},e);return u[t.id]=[],u;case"REMOVE-TODOLIST":var s=Object(v.a)({},e);return delete s[t.todolistID],s;default:return e}},todolists:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:j,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CHANGE-TODOLIST-TITLE":var a=e.find((function(e){return e.id===t.id}));return a&&(a.title=t.title),Object(O.a)(e);case"CHANGE-FILTER":var n=e.find((function(e){return e.id===t.todoListID}));return n&&(n.filter=t.value),Object(O.a)(e);case"ADD-TODOLIST-TYPE":var i={id:t.id,title:t.title,filter:"all"};return[].concat(Object(O.a)(e),[i]);case"REMOVE-TODOLIST":var c=e.filter((function(e){return e.id!==t.todolistID}));return c;default:return e}}}),R=Object(N.c)(K);window.store=R,r.a.render(i.a.createElement(E.a,{store:R},i.a.createElement(H,null)," "),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[63,1,2]]]);
//# sourceMappingURL=main.40e92ce4.chunk.js.map