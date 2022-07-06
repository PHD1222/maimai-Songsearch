const MIN_SROLL_Y = 80;
window.onscroll = function() {scrollFunction()};
function scrollFunction()
{
    document.getElementById("to_top").style.display = document.body.scrollTop > MIN_SROLL_Y || document.documentElement.scrollTop > MIN_SROLL_Y ?
        "block" : "none";
}
function Gototop()
{
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}