(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const m of s.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&i(m)}).observe(document,{childList:!0,subtree:!0});function c(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=c(o);fetch(o.href,s)}})();const S=document.querySelector("#theme-toggle-button"),a=document.querySelector("#light-mode-icon"),u=document.querySelector("#dark-mode-icon"),f=localStorage.getItem("theme"),T=window.matchMedia("(prefers-color-scheme: dark)").matches,k=()=>{f==="dark"||!f&&T?(document.documentElement.classList.add("dark"),a.style.display="inline-block",u.style.display="none"):(document.documentElement.classList.remove("dark"),u.style.display="inline-block",a.style.display="none")},E=()=>{document.documentElement.classList.contains("dark")?(document.documentElement.classList.remove("dark"),localStorage.setItem("theme","light"),u.style.display="inline-block",a.style.display="none"):(document.documentElement.classList.add("dark"),localStorage.setItem("theme","dark"),a.style.display="inline-block",u.style.display="none")};S.addEventListener("click",E);k();const t=e=>document.querySelector(`#${e}`),x=t("search-form"),C=t("search-input"),p=t("counter-section"),I=t("repos-count"),N=t("followers-count"),O=t("following-count"),_=t("gists-count"),h=t("main-section"),$=t("avatar"),y=t("name"),M=t("username"),q=t("date"),D=t("follow-button"),g=t("bio"),F=t("location"),J=t("location-container"),P=t("company"),A=t("company-container"),b=t("blog"),w=t("twitter"),v=t("user-not-found-section"),d=t("loader-section"),B=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],l=e=>{e.classList.contains("inactive")&&e.classList.remove("inactive")},r=e=>{e.classList.contains("inactive")||e.classList.add("inactive")},j=e=>{const n=(i,o)=>i===""||i===null?(r(o),!0):(l(o),!1);I.innerText=e.public_repos,N.innerText=e.followers,O.innerText=e.following,_.innerText=e.public_gists,$.src=e.avatar_url,n(e.name,y)||(y.innerText=e.name),M.innerText=`@${e.login}`;const c=e.created_at.split("T").shift().split("-");q.innerText=`Joined ${c[2]} ${B[c[1]-1]} ${c[0]}`,D.href=e.html_url,n(e.bio,g)||(g.innerText=e.bio),n(e.location,J)||(F.innerText=e.location),n(e.company,A)||(P.innerText=e.company),n(e.blog,b)||(b.href=e.blog),n(e.twitter_username,w)||(w.href=`https://twitter.com/${e.twitter_username}`)},L=async e=>{l(d),r(p),r(h),r(v);try{const n=await fetch(`https://api.github.com/users/${e}`);if(!n.ok)throw new Error("User not found");const c=await n.json();j(c),l(p),l(h),r(d)}catch{l(v),r(d)}};L("google");x.addEventListener("submit",e=>{e.preventDefault();const n=C.value;n!==""&&L(n)});