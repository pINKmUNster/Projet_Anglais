/**
 * Created by xhtg4382 on 30/10/2014.
 */
    //replace tag by <a href='#">
function changeDiv2A(tag)
{
    var list = document.getElementsByClassName(tag);
    console.log(list);
    alert(list.length);
    var src, el, attrs;
    for(var i=0,l=list.length;i<l;i++)
    {
        src = list[i];
        el = document.createElement('a');
        attrs = src.attributes;
        for(var j=0,k=attrs.length;j<k;j++) {
            el.setAttribute(attrs[j].name, attrs[j].value);
        }
        el.innerHTML = src.innerHTML;
        el.setAttribute('href','#');
        src.parentNode.replaceChild(el, src);
    }
}