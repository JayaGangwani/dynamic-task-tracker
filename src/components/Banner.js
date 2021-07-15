import "./Banner.css";
function Banner(){
    const aboutBatman = "Batman is a superhero who appears in American comic books published by DC Comics. Batman was created by artist Bob Kane and writer Bill Finger, and debuted in the 27th issue of the comic book Detective Comics on March 30, 1939. In the DC Universe continuity, Batman is the alias of Bruce Wayne, a wealthy American playboy, philanthropist, and industrialist who resides in Gotham City. Batman's origin story features him swearing vengeance against criminals after witnessing the murder of his parents.";
    return <>
    <h1>Hero Banner</h1>
    <div class="hero-banner">
    <h1 class="fade-in-text padding-sm">Batman, the dark knight</h1>
    <h3 class="fade-in-text no-margin">{aboutBatman}</h3>
    </div>
    <h1>Full width banner</h1>
    <div class="full-width-banner">
    <div class="padding-full-lg">
    <h1 class="fade-in-text">Batman, the dark knight</h1>
    <h3 class="fade-in-text no-margin">{aboutBatman}</h3>
    </div>
    </div>
    </>
}

export default Banner;