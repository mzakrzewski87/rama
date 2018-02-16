/*
 * Copyright (C) 2018 Michał Zakrzewski
 * m(dot)zakrzewski87(at)gmail(dot)com
 * This file is part of rama.
 * rama is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 * rama is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with rama.  If not, see http://www.gnu.org/licenses/
 *
 * Ten plik jest częścią ramy.
 * rama jest wolnym oprogramowaniem: możesz je rozprowadzać dalej
 * i/lub modyfikować na warunkach  Pomniejszej Powszechnej Licencji Publicznej GNU,
 * wydanej przez Fundację Wolnego Oprogramowania - według wersji 3 tej
 * Licencji lub (według twojego wyboru) którejś z późniejszych wersji.
 *
 * rama rozpowszechniana jest z nadzieją, iż będzie ona
 * użyteczna - jednak BEZ JAKIEJKOLWIEK GWARANCJI, nawet domyślnej
 * gwarancji PRZYDATNOŚCI HANDLOWEJ albo PRZYDATNOŚCI DO OKREŚLONYCH
 * ZASTOSOWAŃ. W celu uzyskania bliższych informacji sięgnij do
 * Pomniejszej Powszechnej Licencji Publicznej GNU.
 *
 * Z pewnością wraz z ramą otrzymałeś też egzemplarz Pomniejszej
 * Powszechnej Licencji Publicznej GNU (GNU Lesser General Public License).
 * Jeśli nie - zobacz http://www.gnu.org/licenses/
 */

/******************************************************************************/
/* frame pieces */
/******************************************************************************/
/* podsiodłowa / seat tube*/
/******************************************************************************/

var st = {

    angle: 74.5, //in
    diameter: 28, // in
    length: 550, //560, //in
    extra: 30, // in; extra length to top
    xct: 0, //out, x of the c-c with the top tube
    yct: 0, //out, y of the c-c with the top tube,
    xcb: 0, //out, same as x of bb center
    ycb: 0, //out, same as y of bb center
    color: "#0000aa", //in
    
    draw: function() {
        draw_pipe(this.xcb, this.ycb, this.length, this.angle, this.diameter, this.color);
        draw_pipe(this.xct, this.yct, this.extra, this.angle, this.diameter, this.color);
    }
};

/******************************************************************************/
/* główka / headtube */
/******************************************************************************/

var ht = {

    angle: 74.5, //in
    diameter: 38,
    length: 45,// in c-c
    extra_top: 40, // in t-c
    extra_bottom: 40, // in b-c
    xcu: 0,
    ycu: 0,
    xcuu: 0,
    ycuu: 0,
    xcl: 0,
    ycl: 0,
    xcll: 0,
    ycll: 0,
    color: "#000055",

    draw: function() {
        draw_pipe(this.xcl, this.ycl, this.length, this.angle, this.diameter, this.color);
        draw_pipe(this.xcll, this.ycll, this.extra_bottom, this.angle, this.diameter, this.color);
        draw_pipe(this.xcu, this.ycu, this.extra_top, this.angle, this.diameter, this.color);
    }
};

/******************************************************************************/
/* stery / headset*/
/******************************************************************************/

var hs = {
        angle: 0, 
        th: 11.3, // in; top height
        td: 48, // in; top diameter
        xt: 0, // out; x top
        xtt: 0, // out; x top top
        yt: 0, // out; y top
        ytt: 0, // out; y top top
        bh: 11.3, // in; bottom height
        bd: 48, // in; botton diameter
        xb: 0, // out; x bottom
        xbb: 0, // out; x bottom bottom
        yb: 0, // out; y bottom
        ybb: 0, // out; y bottom bottom
        color: "#000000",
        
        draw: function() {
            draw_pipe(this.xt, this.yt, this.th, ht.angle, this.td);
            draw_pipe(this.xbb, this.ybb, this.bh, ht.angle, this.bd);
        }
    };   

/******************************************************************************/
/* górna / top tube*/
/******************************************************************************/

var tt = {

    angle: 180, //in
    diameter: 25,
    length: 560,//560 //in
    xcs: 0, //out
    ycs: 0, //out
    xch: 0, //out
    ych: 0, //out
    color: "#0000ee",

    draw: function() {
        draw_pipe(this.xcs, this.ycs, tt.length, tt.angle, tt.diameter);
    }
};
/******************************************************************************/
/* koło przednie / front wheel */
/******************************************************************************/

var f_wheel = {
    diameter: 622, //in
    tyre: 35, //in
    xc: 0, //out
    yc: 0, //out
    
    draw: function() {
        draw_circle_scaled(this.xc, this.yc, this.diameter/2, "#ff0000");
        draw_circle_scaled(this.xc, this.yc, this.diameter/2 + this.tyre,"#ff0000");
        draw_circle_scaled(this.xc, this.yc, 5,"#000000");
    }
};
/******************************************************************************/
/* koło tylnie / rear wheel */
/******************************************************************************/

var r_wheel = {
        diameter: 622, //in
        tyre: 35, //in
        xc: 0, //out
        yc: 0, //out
        
        draw: f_wheel.draw
    };
/******************************************************************************/
/* suport / bottom bracket */
/******************************************************************************/

var bb = {

    offset: 60, //in // bb drop
    diameter: 38, //in
    width: 68, //in
    xc: 0, //out
    yc: 0, //out
    color: "#dd0000",

    draw: function() {
        draw_circle_scaled(this.xc, this.yc, this.diameter/2, this.color);
    }
};

/******************************************************************************/
/* widełki dolne / chainstays */
/******************************************************************************/

var cs = {
    diameter:18, //in
    bb_z_offset: 17, //in
    angle: 0, //out
    angle_to_bb: 0, //out
    angle_to_dropout: 0, //out
    length_xy: 0, //out
    length_total: 0, //out
    xcd: 0, //out
    ycd: 0, //out
    zcd: 0, //out
    xcb: 0,
    ycb: 0,
    zcb: 0, 
    color: "#0000ff",
        
    draw: function() {
        draw_pipe(bb.xc, bb.yc, cs.length_xy, cs.angle, cs.diameter);
    }
};

/******************************************************************************/
/* widełki górne / seatstays */
/******************************************************************************/

var ss = {
    diameter: 12, //in
    angle: 0, //out
    angle_to_st: 0, //out
    angle_to_dropout: 0, //out
    length_xy: 0, //out, length of projection onto xy plane
    length_total: 0, //out, real length
    xcd: 0, //out
    ycd: 0, //out
    zcd: 0, //out
    xct: 0, //out
    yct: 0, //out
    zct: 0, //out
    st_z_offset: 8, //in
    st_lwise_offset: 0, //in
    color: "#000099",
    
    draw: function() {
        draw_pipe(this.xcd, this.ycd, this.length_xy, this.angle, this.diameter, this.color);
    }
}

/******************************************************************************/
/* dolna / down tube */
/******************************************************************************/

var dt = {
    angle: 0, //out
    diameter: 28, // in
    xcb: 0, // out
    ycb: 0, // out
    xct: 0, // out
    yct: 0, // out
    length: 0, //out
    color: "#000066",
        
    draw: function() {
        draw_pipe(this.xct, this.yct, this.length, -this.angle, this.diameter);
    }
};

/******************************************************************************/
/* widelec / fork */
/******************************************************************************/

var fork = {
    offset: 50, // in
    diameter: 20, //in
    angle: 0, //out
    length: 0, // out
    xct: 0, //out
    yct: 0, //out
    xcb: 0, // out
    ycb: 0, // out
    color: "aa0000",
        
    draw: function() {
        draw_pipe(this.xcb, this.ycb, this.length, this.angle, this.diameter);
    }
};

/******************************************************************************/
/* korba / crank(set) */
/******************************************************************************/

var cranks = {

    length: 175, // in
    angle: 0, //out
    teeth: 50, //in
    radius: 0, //out
    chainline: 41.5, //in
    crank_z_internal: 46, //in
    crank_z_external: 56, //in
    xc: 0, //out
    yc: 0, //out
    xce: 0, // out
    yce: 0, // out
    color: "#000000",

    draw: function() {
        draw_line_scaled(this.xc, this.yc, this.xce, this.yce, this.color);
        draw_circle_scaled(this.xc, this.yc, this.radius, this.color);
    }
};

/******************************************************************************/
/* pedały / pedals */
/******************************************************************************/

var pedals = {

    length: 95, //in
    angle: 0, //out
    z_internal: 82, //in
    z_external: 162, //in
    xc: 0, //out
    yc: 0, //out
    color: "#00aa00",

    draw: function() {
        
        draw_pipe(this.xc - this.length/2*Math.cos(this.angle*Math.PI/180),
            this.yc - this.length/2*Math.sin(this.angle*Math.PI/180),
            this.length,
            this.angle,
            20,
            this.color);

        //draw_line_scaled(
        //this.xc - this.length/2*Math.cos(this.angle*Math.PI/180),
        //this.yc - this.length/2*Math.sin(this.angle*Math.PI/180),
        //this.xc + this.length/2*Math.cos(this.angle*Math.PI/180),
        //this.yc + this.length/2*Math.sin(this.angle*Math.PI/180),
        //this.color);
    }
};
/******************************************************************************/
/* haki / dropouts */
/******************************************************************************/

var dropout = {
    offset: 400, // in
    ss_offset_x: -12.5, //in
    ss_offset_y: 12.5, //in
    cs_offset_x: 12.5, //in
    cs_offset_y: -5, //in
    span: 120, //in
    thickness: 5, //in
    length: 25, //in
    xc: 0, // out
    yc: 0, //out
    draw: function() {
        draw_pipe(this.xc, this.yc, this.length, 0, 10, "#000000");
        
        draw_line_scaled(this.xc, this.yc, this.xc, this.yc+this.ss_offset_y, "#000000");
        draw_line_scaled(this.xc, this.yc+this.ss_offset_y, this.xc-this.ss_offset_x, this.yc+this.ss_offset_y, "#000000");
        
        draw_line_scaled(this.xc, this.yc, this.xc, this.yc+this.cs_offset_y, "#000000");
        draw_line_scaled(this.xc, this.yc+this.cs_offset_y, this.xc-this.cs_offset_x, this.yc+this.cs_offset_y, "#000000");
    }
};

/******************************************************************************/
/* other variables */
/******************************************************************************/

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x0 = canvas.width / 2;
var y0 = canvas.height / 2;

var xmin = 0;
var xmax = canvas.width;

var ymin = 0; 
var ymax = canvas.height;

var scale = 1;//0.5;

var pixels_per_mm = 96 / 25.4;

var summary = "";


/******************************************************************************/
/* functions */
/******************************************************************************/

function resize_if_necessary(x1, y1, x2, y2)
{
    if(x1 < xmin) xmin = x1;
    if(x1 > xmax) xmax = x1;
    
    if(x2 < xmin) xmin = x2;
    if(x2 > xmax) xmax = x2;
    
    if(y1 < ymin) ymin = y1;
    if(y1 > ymax) ymax = y1;
    
    if(y2 < ymin) ymin = y2;
    if(y2 > ymax) ymax = y2;
    
    if(xmin == x1 || xmin == x2 || xmax == x1 || xmax == x2) return true;
    if(ymin == y1 || ymin == y2 || ymax == y1 || ymax == y2) return true;
    
    return false;
}


function draw_line(x1,y1,x2,y2,kolor)
{
    if(resize_if_necessary(x1, y1, x2, y2)) return;
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth=1;
    ctx.strokeStyle=kolor;
    ctx.stroke();	
}

function draw_line_scaled(x1,y1,x2,y2,kolor)
{
    draw_line(
        x0 + x1*scale*pixels_per_mm, y0 - y1*scale*pixels_per_mm,
        x0 + x2*scale*pixels_per_mm, y0 - y2*scale*pixels_per_mm,
        kolor);
}

function draw_circle(x,y,r,kolor)
{
    if(resize_if_necessary(x-r, y-r, x+r, y+r)) return;
    
    ctx.beginPath();
    ctx.arc(x,y,r,0*Math.PI,2*Math.PI)
    ctx.lineWidth=1;
    ctx.strokeStyle=kolor;
    ctx.stroke();
}

function draw_circle_scaled(x,y,r,kolor)
{
    draw_circle(
        x0 + x*scale*pixels_per_mm,
        y0 - y*scale*pixels_per_mm,
        r*scale*pixels_per_mm,
        kolor);
}

function draw_pipe(x1,y1, length, angle, diameter, color)
{
    let dx = Math.cos((angle + 90)*Math.PI/180)*diameter/2;
    let dy = Math.sin((angle + 90)*Math.PI/180)*diameter/2;

    let x2 = x1 + Math.cos(angle*Math.PI/180) * length;
    let y2 = y1 + Math.sin(angle*Math.PI/180) * length;
    
    draw_line_scaled(x1, y1, x2, y2, color);

    draw_line_scaled(x1 + dx, y1 + dy, x2 + dx, y2 + dy, color);
    draw_line_scaled(x1 - dx, y1 - dy, x2 - dx, y2 - dy, color);

    draw_line_scaled(x1 + dx, y1 + dy, x1 - dx, y1 - dy, color);
    draw_line_scaled(x2 + dx, y2 + dy, x2 - dx, y2 - dy, color);    
}

function angle_from_line(x1,y1,x2,y2)
{
    let b = (x2 - x1);
    let a = (y2 - y1);
    let c = Math.sqrt(b*b + a*a);
    return 180/Math.PI*Math.acos(b/c);
}

function length_from_line(x1,y1,x2,y2)
{
    let a = x2 - x1;
    let b = y2 - y1;

    return Math.sqrt(a*a + b*b);
}

function vector_length(dx, dy, dz)
{    
    return Math.sqrt((dx*dx) + (dy*dy) + (dz*dz));
}

/* result in radians not degrees */
function angle_from_vectors(dx1, dy1, dz1, dx2, dy2, dz2)
{
    let l1 = vector_length(dx1, dy1, dz1);
    let l2 = vector_length(dx2, dy2, dz2);
    
    let scalar = dx1*dx2 + dy1*dy2 + dz1*dz2;
    
    let result = Math.acos(scalar / (l1 * l2));
    
    return result; 
}


function calculate()
{
    summary = "";
    
    //bb
    bb.xc = 0;
    bb.yc = - bb.offset;
    
    summary += "bottom bracket drop / obniżenie suportu: " + bb.offset.toPrecision(4) + " mm\n";
    summary += "bottom width / szerokość mufy suportu: " + bb.width.toPrecision(4) + " mm\n";
    summary += "bottom diameter / średnica mufy suportu: " + bb.diameter.toPrecision(4) + " mm\n";
    summary += "\n";

    //st
    st.xcb = bb.xc;
    st.ycb = bb.yc;
    st.xct = bb.xc + Math.cos(st.angle*Math.PI/180) * st.length;
    st.yct = bb.yc + Math.sin(st.angle*Math.PI/180) * st.length;
    
    summary += "seat tube length c-c / długość rury podsiodłowej środek - środek: " + st.length.toPrecision(4) + " mm\n";
    summary += "seat tube length c-t / długość rury podsiodłowej środek - koniec: " + (st.length + st.extra).toPrecision(4) + " mm\n";
    summary += "seat tube angle with ground / kąt rury podsiodłowej względem podłoża: " + st.angle.toPrecision(4) + " deg\n";
    summary += "seat tube diameter / średnica rury podsiodłowej: " + st.diameter.toPrecision(4) + " mm\n";
    summary += "\n";
    
    //tt
    tt.xcs = st.xct;
    tt.ycs = st.yct;
    tt.xch = tt.xcs + Math.cos(tt.angle*Math.PI/180) * tt.length;
    tt.ych = tt.ycs + Math.sin(tt.angle*Math.PI/180) * tt.length;
    
    summary += "top tube length c-c / długość rury górnej środek - środek: " + tt.length.toPrecision(4) + " mm\n";
    summary += "top tube angle with ground / kąt rury górnej względem podłoża: " + (tt.angle - 180).toPrecision(4) + " deg\n";
    summary += "top tube diameter / średnica rury górnej: " + st.diameter.toPrecision(4) + " mm\n";
    summary += "\n";

    //ht
    ht.xcu = tt.xch;
    ht.ycu = tt.ych;
    ht.xcuu = ht.xcu + Math.cos(ht.angle*Math.PI/180) * ht.extra_top;
    ht.ycuu = ht.ycu + Math.sin(ht.angle*Math.PI/180) * ht.extra_top;
    
    ht.xcl = ht.xcu - Math.cos(ht.angle*Math.PI/180) * ht.length;
    ht.ycl = ht.ycu - Math.sin(ht.angle*Math.PI/180) * ht.length;
    ht.xcll = ht.xcl - Math.cos(ht.angle*Math.PI/180) * ht.extra_bottom;
    ht.ycll = ht.ycl - Math.sin(ht.angle*Math.PI/180) * ht.extra_bottom;
    
    summary += "head tube length c-c / długość główki ramy środek - środek: " + ht.length.toPrecision(4) + " mm\n";
    summary += "head tube length total / długość całkowita główki ramy: " + (ht.length + ht.extra_top + ht.extra_bottom).toPrecision(4) + " mm\n";
    summary += "head tube extra length top / długość górnego naddatku główki ramy: " + ht.extra_top.toPrecision(4) + " mm\n";
    summary += "head tube extra length bottom / długość dolnego naddatku główki ramy: " + ht.extra_bottom.toPrecision(4) + " mm\n";
    summary += "head tube angle with ground / kąt główki ramy względem podłoża: " + ht.angle.toPrecision(4) + " deg\n";
    summary += "head tube diameter / średnica główki ramy: " + ht.diameter.toPrecision(4) + " mm\n";
    summary += "\n";

    //hs
    hs.angle = ht.angle;

    hs.xt = ht.xcuu;
    hs.yt = ht.ycuu;
    hs.xtt = hs.xt + Math.cos(hs.angle*Math.PI/180) * hs.th;
    hs.ytt = hs.yt + Math.sin(hs.angle*Math.PI/180) * hs.th;

    hs.xb = ht.xcll;
    hs.yb = ht.ycll;
    hs.xbb = hs.xb - Math.cos(hs.angle*Math.PI/180) * hs.bh;
    hs.ybb = hs.yb - Math.sin(hs.angle*Math.PI/180) * hs.bh;
    
    summary += "headset top height / wysokość górnego łożyska sterów: " + hs.th.toPrecision(4) + " mm\n";
    summary += "headset top diameter / średnica górnego łożyska sterów: " + hs.td.toPrecision(4) + " mm\n";
    summary += "headset bottom height / wysokość dolnego łożyska sterów: " + hs.bh.toPrecision(4) + " mm\n";
    summary += "headset bottom diameter / średnica dolnego łożyska sterów: " + hs.bd.toPrecision(4) + " mm\n";
    summary += "\n";

    //dt
    dt.xcb = bb.xc;
    dt.ycb = bb.yc;
    dt.xct = ht.xcl;
    dt.yct = ht.ycl;
    dt.angle = angle_from_line(dt.xct, dt.yct, dt.xcb, dt.ycb);
    dt.length = length_from_line(dt.xct, dt.yct, dt.xcb, dt.ycb);

    summary += "down tube length c-c / długość rury dolnej środek-środek: " + dt.length.toPrecision(4) + " mm\n";
    summary += "down tube angle with ground / kąt rury dolnej względem podłoża: " + (dt.angle).toPrecision(4) + " deg\n";
    summary += "down tube diameter / średnica rury dolnej: " + dt.diameter.toPrecision(4) + " mm\n";
    summary += "\n";

    //dropout
    dropout.xc = bb.xc + dropout.offset;
    dropout.yc = 0;
    
    summary += "dropout offset to bottom bracket / przesunięcie haków od suportu: " + dropout.offset.toPrecision(4) + " mm\n";
    summary += "dropout span / rozstaw haków: " + dropout.span.toPrecision(4) + " mm\n";
    summary += "dropout thickness / grubość haków: " + dropout.thickness.toPrecision(4) + " mm\n";
    summary += "dropout length / długość haków: " + dropout.length.toPrecision(4) + " mm\n";
    summary += "dropout seatstay offset x / przesunięcie górnych widełek na haku x: " + dropout.ss_offset_x.toPrecision(4) + " mm\n";
    summary += "dropout seatstay offset y / przesunięcie górnych widełek na haku y: " + dropout.ss_offset_y.toPrecision(4) + " mm\n";
    summary += "dropout chainstay offset x / przesunięcie dolnych widełek na haku x: " + dropout.cs_offset_x.toPrecision(4) + " mm\n";
    summary += "dropout chainstay offset y / przesunięcie dolnych widełek na haku y: " + dropout.cs_offset_y.toPrecision(4) + " mm\n";
    summary += "\n";

    //cs
    cs.xcd = dropout.xc - dropout.cs_offset_x;
    cs.ycd = dropout.yc + dropout.cs_offset_y;
    cs.zcd = dropout.span/2 + dropout.thickness/2;
    cs.xcb = bb.xc;
    cs.ycb = bb.yc;
    cs.zcb = cs.bb_z_offset;
    cs.angle = angle_from_line(cs.xcb, cs.ycb, cs.xcd, cs.ycd);
    cs.length_xy = length_from_line(cs.xcb, cs.ycb, cs.xcd, cs.ycd);
    
    cs.length_total = vector_length(cs.xcd - cs.xcb, cs.ycd - cs.ycb, cs.zcd - cs.zcb);
    
    cs.angle_to_bb = angle_from_vectors(
        0, 0, 1, // the bottom bracket axis is purely in z
        cs.xcd - cs.xcb, cs.ycd - cs.ycb, cs.zcd - cs.zcb) *180 / Math.PI;
    
    cs.angle_to_dropout = 90 - cs.angle_to_bb;
    
    summary += "chainstay diameter / średnica widełek dolnych: " + cs.diameter.toPrecision(4) + " mm\n";
    summary += "chainstay bb z-axis offset / przesunięcie widełek dolnych po suporcie w osi z: " + cs.bb_z_offset.toPrecision(4) + " mm\n";
    summary += "chainstay real length / rzeczywista długość dolnych widełek: " + cs.length_total.toPrecision(4) + " mm\n";
    summary += "chainstay angle to bottom bracket / kąt pomiędzy dolnymi widełkami a suportem: " + cs.angle_to_bb.toPrecision(4) + " deg\n";
    summary += "chainstay angle to dropout plane / kąt pomiędzy dolnymi widełkami a płaszczyzną haków: " + cs.angle_to_dropout.toPrecision(4) + " deg\n";
    summary += "chainstay angle to ground in projection to dropout plane / kąt pomiędzy dolnymi widełkami w rzucie na płaszczyznę haków a podłożem: " + cs.angle.toPrecision(4) + " deg\n";
    summary += "\n";

    //ss
    ss.xcd = dropout.xc - dropout.ss_offset_x;
    ss.ycd = dropout.yc + dropout.ss_offset_y;
    ss.zcd = dropout.span/2 + dropout.thickness/2;
    //ss.xct = st.xct;
    //ss.yct = st.yct;
    
    ss.xct = bb.xc + Math.cos(st.angle*Math.PI/180) * (st.length - ss.st_lwise_offset);
    ss.yct = bb.yc + Math.sin(st.angle*Math.PI/180) * (st.length - ss.st_lwise_offset);
    ss.zct = ss.st_z_offset;
    
    ss.angle = angle_from_line(ss.xcd, ss.ycd, ss.xct, ss.yct);
    ss.length_xy = length_from_line(ss.xcd, ss.ycd, ss.xct, ss.yct);
    
    ss.length_total = vector_length(ss.xct - ss.xcd, ss.yct - ss.ycd, ss.zct, ss.zcd);
    
    ss.angle_to_st = angle_from_vectors(
        st.xct - st.xcb, st.yct - st.ycb, 0, // seat tube has zero diff in z axis
        ss.xct - ss.xcd, ss.xcd - ss.ycd, ss.zct - ss.zcd) *180 / Math.PI;
        
    ss.angle_to_dropout = angle_from_vectors(
        0, 0, 1, // z axis is perpendicular to dropout plane
        ss.xct - ss.xcd, ss.xcd - ss.ycd, ss.zct - ss.zcd) *180 / Math.PI;
    
    /* calculated above was actually angle to axis perpendicular to dropout plane */
    ss.angle_to_dropout = ss.angle_to_dropout - 90;
    
    summary += "seatstay diameter / średnica widełek górnych: " + ss.diameter.toPrecision(4) + " mm\n";
    summary += "seatstay st z-axis offset / przesunięcie widełek górnych po rurze podsiodłowej w osi z: " + ss.st_z_offset.toPrecision(4) + " mm\n";
    summary += "seatstay real length / rzeczywista długość górnych widełek: " + ss.length_total.toPrecision(4) + " mm\n";
    summary += "seatstay angle to ground in projection to dropout plane / kąt pomiędzy górnymi widełkami w rzucie na płaszczyznę haków a podłożem: " + (180 - ss.angle).toPrecision(4) + " deg\n";
    summary += "seatstay angle to seat tube / kąt pomiędzy górnymi widełkami a rurą podsiodłową: " + ss.angle_to_st.toPrecision(4) + " deg\n";
    summary += "seatstay angle to dropout plane / kąt pomiędzy górnymi widełkami a płaszczyzną haków: " + ss.angle_to_dropout.toPrecision(4) + " deg\n";
    summary += "\n";
    
    //fork
    fork.xct = hs.xbb;
    fork.yct = hs.ybb;
    fork.xcb = hs.xbb - fork.offset - 1 / Math.tan(ht.angle*Math.PI/180) * hs.ybb;
    fork.ycb = 0;
    fork.angle = angle_from_line(fork.xcb, fork.ycb, fork.xct, fork.yct);
    fork.length = length_from_line(fork.xcb, fork.ycb, fork.xct, fork.yct);

    summary += "fork length / długość widelca: " + fork.length.toPrecision(4) + " mm\n";
    summary += "fork offset / wyprzedzenie widelca: " + fork.offset.toPrecision(4) + " mm\n";
    summary += "\n";

    cranks.angle = angle_from_line(bb.xc, bb.yc, fork.xcb, fork.ycb);
    cranks.xc = bb.xc;
    cranks.yc = bb.yc;
    cranks.xce = bb.xc + cranks.length*Math.cos(cranks.angle*Math.PI/180);
    cranks.yce = bb.yc + cranks.length*Math.sin(cranks.angle*Math.PI/180);
    cranks.radius = 12.7 / Math.sin(Math.PI/cranks.teeth) / 2;

    summary += "cranks length / długość korb: " + cranks.length.toPrecision(4) + " mm\n";
    summary += "chainring teeth / ilość zębów zębatki na korbie: " + cranks.teeth.toPrecision(4) + " teeth/zębów\n";
    summary += "chainline / linia łańcucha: " + cranks.chainline.toPrecision(4) + " mm\n";
    summary += "pedal length / długość pedałów: " + pedals.length.toPrecision(4) + " mm\n";


    summary += "\n";

    pedals.angle = cranks.angle;    
    pedals.xc = cranks.xce;// + pedals.length*Math.cos(pedals.angle);
    pedals.yc = cranks.yce;// + pedals.length*Math.sin(pedals.angle);

// do przełożenia gdzie indziej
    let xtmp = fork.xcb + (f_wheel.diameter/2 + f_wheel.tyre)*Math.cos((cranks.angle+180)*Math.PI/180);
    let ytmp = fork.ycb + (f_wheel.diameter/2 + f_wheel.tyre)*Math.sin((cranks.angle+180)*Math.PI/180);

    let xtmp2 = pedals.xc + pedals.length/2*Math.cos(pedals.angle*Math.PI/180);
    let ytmp2 = pedals.yc + pedals.length/2*Math.sin(pedals.angle*Math.PI/180);

    draw_line_scaled(xtmp, ytmp, xtmp2, ytmp2, "#000000");

    //console.log("x tyre y tyre ", xtmp, " ", ytmp);
    //console.log("x pedal y pedal ", xtmp2, " ", ytmp2);
    let tyre_pedal_dist = length_from_line(xtmp,ytmp,xtmp2,ytmp2);
    summary += "tyre-pedal distance: " + tyre_pedal_dist.toPrecision(4) + " mm\n"; 
    summary += "\n";
// ~ do przełożenia gdzie indziej
    f_wheel.xc = fork.xcb;
    f_wheel.yc = fork.ycb;

    r_wheel.xc = dropout.xc;
    r_wheel.yc = dropout.yc;

    summary += "front wheel rim diameter / średnica obręczy koła przedniego: " + f_wheel.diameter.toPrecision(4) + " mm\n";
    summary += "front wheel tyre width / profil opony koła przedniego: " + f_wheel.tyre.toPrecision(4) + " mm\n";
    summary += "rear wheel rim diameter / średnica obręczy koła tylnego: " + r_wheel.diameter.toPrecision(4) + " mm\n";
    summary += "rear wheel tyre width / profil opony koła tylnego: " + r_wheel.tyre.toPrecision(4) + " mm\n"; 


    summary += "wheelbase / rozstaw osi: " + (r_wheel.xc - f_wheel.xc).toPrecision(4) + " mm\n"; 
    summary += "\n";

    //zrobic cos z tym
    let ground_level = f_wheel.yc - f_wheel.diameter/2 - f_wheel.tyre;
    let top_tube_top = st.yct + tt.diameter /2;
    
    summary += "standover height at tt-st joint / wysokość przekroku ramy przy złączu rura górna - podsiodłowa: " + (top_tube_top - ground_level).toPrecision(4) + " mm\n"; 
    summary += "\n";    
    
    let ht_tt_angle = angle_from_vectors(ht.xcl - ht.xcu, ht.ycl - ht.ycu, 0,
        tt.xch - tt.xcs, tt.ych - tt.ycs, 0) *180 / Math.PI;
        
    summary += "head tube - top tube angle / kąt pomiędzy główką ramy a rurą górną: " + ht_tt_angle.toPrecision(4) + " deg\n"; 
    summary += "\n";  
    
    let ht_dt_angle = angle_from_vectors(ht.xcl - ht.xcu, ht.ycl - ht.ycu, 0,
        dt.xcb - dt.xct, dt.ycb - dt.yct, 0) *180 / Math.PI;
        
    summary += "head tube - down tube angle / kąt pomiędzy główką ramy a rurą dolną: " + ht_dt_angle.toPrecision(4) + " deg\n"; 
    summary += "\n";  
    
    let st_dt_angle = angle_from_vectors(st.xcb - st.xct, st.ycb - st.yct, 0,
        dt.xcb - dt.xct, dt.ycb - dt.yct, 0) *180 / Math.PI;
        
    summary += "seat tube - down tube angle / kąt pomiędzy rurą podsiodłową a dolną: " + st_dt_angle.toPrecision(4) + " deg\n"; 
    summary += "\n";  
    
    
    document.getElementById("summary").innerHTML = summary;
}

function rysuj()
{
    bb.draw();    
    cranks.draw();
    pedals.draw();
    st.draw();
    tt.draw();
    ht.draw();
    hs.draw();
    dt.draw();
    cs.draw();
    ss.draw();
    fork.draw();
    f_wheel.draw();
    r_wheel.draw();
    dropout.draw();

    //--------------------------------------------------------------------------
    // chainstay drawing

    let cs_dwg_offset = 450;
    
    draw_line_scaled(f_wheel.xc, bb.yc - cs_dwg_offset, r_wheel.xc, bb.yc - cs_dwg_offset);

    //bb
    draw_line_scaled(bb.xc - bb.diameter/2, bb.yc - cs_dwg_offset + bb.width/2, bb.xc + bb.diameter/2, bb.yc - cs_dwg_offset + bb.width/2);
    draw_line_scaled(bb.xc + bb.diameter/2, bb.yc - cs_dwg_offset + bb.width/2, bb.xc + bb.diameter/2, bb.yc - cs_dwg_offset - bb.width/2);
    draw_line_scaled(bb.xc - bb.diameter/2, bb.yc - cs_dwg_offset - bb.width/2, bb.xc + bb.diameter/2, bb.yc - cs_dwg_offset - bb.width/2);
    draw_line_scaled(bb.xc - bb.diameter/2, bb.yc - cs_dwg_offset + bb.width/2, bb.xc - bb.diameter/2, bb.yc - cs_dwg_offset - bb.width/2);

    //r_wheel axel
    draw_line_scaled(r_wheel.xc, bb.yc - cs_dwg_offset + dropout.span/2, r_wheel.xc, bb.yc - cs_dwg_offset - dropout.span/2);

    //dropout
    draw_line_scaled(dropout.xc - dropout.cs_offset_x, bb.yc - cs_dwg_offset + dropout.span/2,
        dropout.xc - dropout.cs_offset_x, bb.yc - cs_dwg_offset + dropout.span/2 + dropout.thickness, "#000000");
    draw_line_scaled(dropout.xc - dropout.cs_offset_x, bb.yc - cs_dwg_offset + dropout.span/2 + dropout.thickness,
        dropout.xc + dropout.length, bb.yc - cs_dwg_offset + dropout.span/2 + dropout.thickness, "#000000");
    draw_line_scaled(dropout.xc + dropout.length, bb.yc - cs_dwg_offset + dropout.span/2 + dropout.thickness,
        dropout.xc + dropout.length, bb.yc - cs_dwg_offset + dropout.span/2, "#000000");
    draw_line_scaled(dropout.xc + dropout.length, bb.yc - cs_dwg_offset + dropout.span/2,
        dropout.xc - dropout.cs_offset_x, bb.yc - cs_dwg_offset + dropout.span/2, "#000000");

    draw_line_scaled(dropout.xc - dropout.cs_offset_x, bb.yc - cs_dwg_offset - dropout.span/2,
        dropout.xc - dropout.cs_offset_x, bb.yc - cs_dwg_offset -dropout.span/2 - dropout.thickness, "#000000");
    draw_line_scaled(dropout.xc - dropout.cs_offset_x, bb.yc - cs_dwg_offset - dropout.span/2 - dropout.thickness,
        dropout.xc + dropout.length, bb.yc - cs_dwg_offset - dropout.span/2 - dropout.thickness, "#000000");
    draw_line_scaled(dropout.xc + dropout.length, bb.yc - cs_dwg_offset - dropout.span/2 - dropout.thickness,
        dropout.xc + dropout.length, bb.yc - cs_dwg_offset - dropout.span/2, "#000000");
    draw_line_scaled(dropout.xc + dropout.length, bb.yc - cs_dwg_offset - dropout.span/2,
        dropout.xc - dropout.cs_offset_x, bb.yc - cs_dwg_offset - dropout.span/2, "#000000");
    
    //chainring
    draw_line_scaled(bb.xc - cranks.radius, bb.yc - cs_dwg_offset + cranks.chainline, bb.xc + cranks.radius, bb.yc - cs_dwg_offset + cranks.chainline);

    // tyre
    draw_circle_scaled(r_wheel.xc - r_wheel.diameter/2 - r_wheel.tyre/2, bb.yc - cs_dwg_offset, r_wheel.tyre/2, "#000000");

    //cs
    let cs_angle = angle_from_line(bb.xc /* + bb.diameter/2 */, bb.yc - cs_dwg_offset + cs.bb_z_offset, dropout.xc - dropout.cs_offset_x, bb.yc - cs_dwg_offset + dropout.span/2 + dropout.thickness/2);
    let cs_length = length_from_line(bb.xc /*  bb.diameter/2 */, bb.yc - cs_dwg_offset + cs.bb_z_offset, dropout.xc - dropout.cs_offset_x, bb.yc - cs_dwg_offset + dropout.span/2 + dropout.thickness/2);
    draw_pipe(bb.xc /* + bb.diameter/2 */, bb.yc - cs_dwg_offset + cs.bb_z_offset, cs_length, cs_angle, cs.diameter);
    draw_pipe(bb.xc /* + bb.diameter/2 */, bb.yc - cs_dwg_offset - cs.bb_z_offset, cs_length, -cs_angle, cs.diameter);

    draw_line_scaled(bb.xc - bb.diameter/2, bb.yc - cs_dwg_offset + bb.width/2, bb.xc - bb.diameter/2, bb.yc - cs_dwg_offset - bb.width/2);
    
    //resizing canvas
    if((xmax - xmin) > canvas.width) canvas.width += xmax - xmin - canvas.width + 20;
    if((ymax - ymin) > canvas.height) canvas.height += ymax - ymin - canvas.height + 20;
    
    x0 -= xmin -10;
    y0 -= ymin -10;
    
    xmin = 0;
    xmax = canvas.width;
    
    ymin = 0;
    ymax = canvas.height;
}

function gather_input()
{
    st.angle = parseFloat(document.getElementById("tf_st_angle").value);
    st.diameter = parseFloat(document.getElementById("tf_st_diameter").value);
    st.length = parseFloat(document.getElementById("tf_st_length").value);
    st.extra = parseFloat(document.getElementById("tf_st_extra").value);

    ht.angle = parseFloat(document.getElementById("tf_ht_angle").value);
    ht.diameter = parseFloat(document.getElementById("tf_ht_diameter").value);    
    ht.length = parseFloat(document.getElementById("tf_ht_length").value);
    ht.extra_top = parseFloat(document.getElementById("tf_ht_extra_top").value);
    ht.extra_bottom = parseFloat(document.getElementById("tf_ht_extra_bottom").value);
    
    hs.td = parseFloat(document.getElementById("tf_hs_top_diameter").value);
    hs.th = parseFloat(document.getElementById("tf_hs_top_height").value);
    hs.bd = parseFloat(document.getElementById("tf_hs_bottom_diameter").value);
    hs.bh = parseFloat(document.getElementById("tf_hs_bottom_height").value);
    
    f_wheel.diameter = parseFloat(document.getElementById("tf_f_wheel_diameter").value);
    f_wheel.tyre = parseFloat(document.getElementById("tf_f_wheel_tyre").value);
    
    r_wheel.diameter = parseFloat(document.getElementById("tf_r_wheel_diameter").value);
    r_wheel.tyre = parseFloat(document.getElementById("tf_r_wheel_tyre").value);

    bb.offset = parseFloat(document.getElementById("tf_bb_offset").value);
    bb.diameter = parseFloat(document.getElementById("tf_bb_diameter").value);
    bb.width = parseFloat(document.getElementById("tf_bb_width").value);
    
    cs.diameter = parseFloat(document.getElementById("tf_cs_diameter").value);
    cs.bb_z_offset = parseFloat(document.getElementById("tf_cs_bb_z_offset").value);
    
    ss.diameter = parseFloat(document.getElementById("tf_ss_diameter").value);
    ss.st_z_offset = parseFloat(document.getElementById("tf_ss_st_z_offset").value);
    ss.st_lwise_offset = parseFloat(document.getElementById("tf_ss_st_lwise_offset").value);    
 
    dt.diameter = parseFloat(document.getElementById("tf_dt_diameter").value);
    
    fork.offset = parseFloat(document.getElementById("tf_fork_offset").value);
    fork.diameter = parseFloat(document.getElementById("tf_fork_diameter").value);
    
    cranks.length = parseFloat(document.getElementById("tf_cranks_length").value);
    cranks.teeth = parseFloat(document.getElementById("tf_cranks_teeth").value);
    cranks.chainline = parseFloat(document.getElementById("tf_cranks_chainline").value);
    
    pedals.length = parseFloat(document.getElementById("tf_pedal_length").value);  
    
    dropout.offset = parseFloat(document.getElementById("tf_dropout_offset").value);  
    dropout.span = parseFloat(document.getElementById("tf_dropout_span").value);  
    dropout.thickness = parseFloat(document.getElementById("tf_dropout_thickness").value);  
    dropout.length = parseFloat(document.getElementById("tf_dropout_length").value);  
    dropout.ss_offset_x = parseFloat(document.getElementById("tf_dropout_ss_offset_x").value);
    dropout.ss_offset_y = parseFloat(document.getElementById("tf_dropout_ss_offset_y").value);  
    dropout.cs_offset_x = parseFloat(document.getElementById("tf_dropout_cs_offset_x").value);  
    dropout.cs_offset_y = parseFloat(document.getElementById("tf_dropout_cs_offset_y").value);  
    
    let scale_divisor = parseFloat(document.getElementById("tf_scale_divisor").value);  

    scale = 1 / scale_divisor;
    
    let dpi = parseFloat(document.getElementById("tf_dpi").value);
    
    pixels_per_mm = dpi / 25.4;    
}
