import{S as d,i as f}from"./assets/vendor-46aac873.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const m="41588863-34d6c5c01e7f0c7c667666520",a=document.querySelector("#search-input"),u=document.querySelector("#image-container"),c=document.querySelector(".loader"),p=document.querySelector("#search-form"),g=new d("#image-container a",{captionsData:"alt",captionDelay:250});p.addEventListener("submit",y);function y(s){s.preventDefault();const t=a.value.trim();if(!t){l();return}c.style.display="block";const n=`https://pixabay.com/api/?key=${m}&q=${t}&image_type=photo&orientation=horizontal&safesearch=true`;fetch(n).then(r=>r.json()).then(r=>{c.style.display="none",Array.isArray(r.hits)&&r.hits.length>0?(h(r.hits),g.refresh(),a.value=""):(l(),f.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"white",backgroundColor:"red",position:"topRight"}),a.value="")}).catch(()=>{c.style.display="none",console.error("Error!")})}function h(s){l(),s.map(t=>{const n=`
      <div class="image-card">
        <a href="${t.largeImageURL}">
          <img src="${t.webformatURL}" alt="${t.tags}">
          <div class="image-info">
            <p><strong>Likes:</strong> ${t.likes}</p>
            <p><strong>Views:</strong> ${t.views}</p>
            <p><strong>Comments:</strong> ${t.comments}</p>
            <p><strong>Downloads:</strong> ${t.downloads}</p>
          </div>
        </a>
      </div>
    `;u.innerHTML+=n})}function l(){u.innerHTML=""}
//# sourceMappingURL=commonHelpers.js.map
