import{u as g,l as h,c as a,a as s,o,b as r,d as n,e as m,F as _,C as l,D as p}from"./vendor.78c4ec04.js";import{_ as k,A as c,b as C,t as E,c as T,P as y}from"./index.a03e9621.js";const b={setup(){const e=g();return h(async()=>{try{e.name=="Tower"&&(await C.getPeopleAttending(e.params.id),await E.getTower(e.params.id),await T.getCommentsByTower(e.params.id))}catch(d){y.error(d)}}),{route:e,tower:a(()=>c.activeTower),comments:a(()=>c.eventComments),attendees:a(()=>c.tickets)}}},x={class:"container-fluid bg-dark"},A={class:"row"},B={class:"row border border-light border-2 p-3"},P={class:"row"},S={class:"row"};function D(e,d,j,i,F,N){const v=s("ActiveTower"),u=s("EventTickets"),w=s("Comments"),f=s("EventComment");return o(),r("div",x,[n("div",A,[m(v)]),n("div",B,[(o(!0),r(_,null,l(i.attendees,t=>(o(),p(u,{key:t.id,attendee:t},null,8,["attendee"]))),128))]),n("div",P,[m(w)]),n("div",S,[(o(!0),r(_,null,l(i.comments,t=>(o(),p(f,{key:t.id,comments:t},null,8,["comments"]))),128))])])}var I=k(b,[["render",D],["__scopeId","data-v-02c7d3cf"]]);export{I as default};