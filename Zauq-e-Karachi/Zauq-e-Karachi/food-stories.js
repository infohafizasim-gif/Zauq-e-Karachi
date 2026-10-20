const stories = [

{
    title:"Burns Road: The Heart of Karachi Food",
    tag:"History",
    image:"https://images.unsplash.com/photo-1559847844-d721426d6edc?q=80&w=1200",
    desc:"The legendary street that shaped Karachi's food culture."
},

{
    title:"Why Nihari Became A Breakfast Icon",
    tag:"Tradition",
    image:"https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200",
    desc:"A slow-cooked legacy passed through generations."
},

{
    title:"Chai Hotels And Karachi Nights",
    tag:"Culture",
    image:"https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=1200",
    desc:"The city never sleeps and neither do its chai spots."
},

{
    title:"The Rise Of Bun Kebab",
    tag:"Street Food",
    image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200",
    desc:"A budget meal that became Karachi's icon."
},

{
    title:"Boat Basin Food Evolution",
    tag:"Modern Karachi",
    image:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200",
    desc:"How Boat Basin transformed into a food destination."
},

{
    title:"Karachi's Love For BBQ",
    tag:"Food Culture",
    image:"https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1200",
    desc:"The story behind smoky tikka and malai boti nights."
}

];

const container = document.getElementById("storiesContainer");

stories.forEach(story => {

container.innerHTML += `

<div class="col-lg-4 col-md-6">

<div class="story-card">

<img src="${story.image}" alt="${story.title}">

<div class="story-content">

<span class="story-tag">
${story.tag}
</span>

<h3>
${story.title}
</h3>

<p>
${story.desc}
</p>

<a href="#">
Read More
</a>

</div>

</div>

</div>

`;

});

document.querySelectorAll(".read-story-btn").forEach(btn => {

btn.addEventListener("click", () => {

Swal.fire({
title:"Karachi Biryani",
text:"Biryani became one of Karachi's most iconic dishes because of migration, culture and family traditions.",
icon:"info"
});

});

});