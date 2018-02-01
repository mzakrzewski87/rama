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
        th: 11.3, // top height
        td: 48, // top diameter
        xt: 0, // x top
        xtt: 0, // x top top
        yt: 0, // y top
        ytt: 0, // y top top
        bh: 11.3, // bottom height
        bd: 48, // botton diameter
        xb: 0, // x bottom
        xbb: 0, // x bottom bottom
        yb: 0, // y bottom
        ybb: 0, // y bottom bottom
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
    offset: 400, //in
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
    diameter: 28,
    xcb: 0,
    ycb: 0,
    xct: 0,
    yct: 0,
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
    xcb: 0,
    ycb: 0,
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
    xce: 0,
    yce: 0,
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
        ss_offset_x: -12.5, //in
        ss_offset_y: 12.5, //in
        cs_offset_x: 12.5, //in
        cs_offset_y: 0, //in
        span: 120, //in
        thickness: 5, //in
        length: 25, //in
        xc: 0, // out
        yc: 0 //out
    };

/******************************************************************************/
/* other variables */
/******************************************************************************/

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x0 = canvas.width / 2 + 100;
var y0 = canvas.height / 2 - 50;

var scale = 1;//0.5;

var summary = "";


/******************************************************************************/
/* functions */
/******************************************************************************/

function draw_line(x1,y1,x2,y2,kolor)
{
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
        x0 + x1*scale, y0 - y1*scale,
        x0 + x2*scale, y0 - y2*scale,
        kolor);
}

function draw_circle(x,y,r,kolor)
{
    ctx.beginPath();
    ctx.arc(x,y,r,0*Math.PI,2*Math.PI)
    ctx.lineWidth=1;
    ctx.strokeStyle=kolor;
    ctx.stroke();
}

function draw_circle_scaled(x,y,r,kolor)
{
    draw_circle(
        x0 + x*scale,
        y0 - y*scale,
        r*scale,
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
    
    summary += "bottom bracket offset: " + bb.offset.toPrecision(4) + " mm\n";
    summary += "\n";

    //st
    st.xcb = bb.xc;
    st.ycb = bb.yc;
    st.xct = bb.xc + Math.cos(st.angle*Math.PI/180) * st.length;
    st.yct = bb.yc + Math.sin(st.angle*Math.PI/180) * st.length;
    
    summary += "seat tube length c-c: " + st.length.toPrecision(4) + " mm\n";
    summary += "seat tube length c-t: " + (st.length + st.extra).toPrecision(4) + " mm\n";
    summary += "seat tube angle with ground: " + st.angle.toPrecision(4) + " deg\n";
    summary += "seat tube diameter: " + st.diameter.toPrecision(4) + " mm\n";
    summary += "\n";
    
    //tt
    tt.xcs = st.xct;
    tt.ycs = st.yct;
    tt.xch = tt.xcs + Math.cos(tt.angle*Math.PI/180) * tt.length;
    tt.ych = tt.ycs + Math.sin(tt.angle*Math.PI/180) * tt.length;
    
    summary += "top tube length c-c: " + tt.length.toPrecision(4) + " mm\n";
    summary += "top tube angle with ground: " + (tt.angle - 180).toPrecision(4) + " deg\n";
    summary += "top tube diameter: " + st.diameter.toPrecision(4) + " mm\n";
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
    
    summary += "head tube length c-c: " + ht.length.toPrecision(4) + " mm\n";
    summary += "head tube length total: " + (ht.length + ht.extra_top + ht.extra_bottom).toPrecision(4) + " mm\n";
    summary += "head tube angle with ground: " + ht.angle.toPrecision(4) + " deg\n";
    summary += "head tube diameter: " + ht.diameter.toPrecision(4) + " mm\n";
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
    
    summary += "headset top height: " + hs.th.toPrecision(4) + " mm\n";
    summary += "headset top diameter: " + hs.td.toPrecision(4) + " mm\n";
    summary += "headset bottom height: " + hs.bh.toPrecision(4) + " mm\n";
    summary += "headset bottom diameter: " + hs.bd.toPrecision(4) + " mm\n";
    summary += "\n";

    //dt
    dt.xcb = bb.xc;
    dt.ycb = bb.yc;
    dt.xct = ht.xcl;
    dt.yct = ht.ycl;
    dt.angle = angle_from_line(dt.xct, dt.yct, dt.xcb, dt.ycb);
    dt.length = length_from_line(dt.xct, dt.yct, dt.xcb, dt.ycb);

    summary += "down tube length c-c: " + dt.length.toPrecision(4) + " mm\n";
    summary += "down tube angle with ground: " + (dt.angle).toPrecision(4) + " deg\n";
    summary += "down tube diameter: " + dt.diameter.toPrecision(4) + " mm\n";
    summary += "\n";

    //dropout
    dropout.xc = bb.xc + cs.offset;
    dropout.yc = 0;

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
    
    summary += "chainstay real length: " + cs.length_total.toPrecision(4) + " mm\n";
    summary += "chainstay angle to bottom bracket: " + cs.angle_to_bb.toPrecision(4) + " deg\n";
    summary += "chainstay angle to dropout plane: " + cs.angle_to_dropout.toPrecision(4) + " deg\n";
    summary += "chainstay angle to ground in projection to dropout plane: " + cs.angle.toPrecision(4) + " deg\n";
    summary += "\n";

    //ss
    ss.xcd = dropout.xc - dropout.ss_offset_x;
    ss.ycd = dropout.yc + dropout.ss_offset_y;
    ss.zcd = dropout.span/2 + dropout.thickness/2;
    ss.xct = st.xct;
    ss.yct = st.yct;
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
    
    summary += "seatstay real length: " + ss.length_total.toPrecision(4) + " mm\n";
    summary += "seatstay angle to ground in projection to dropout plane: " + (180 - ss.angle).toPrecision(4) + " deg\n";
    summary += "seatstay angle to seat tube: " + ss.angle_to_st.toPrecision(4) + " deg\n";
    summary += "seatstay angle to dropout plane: " + ss.angle_to_dropout.toPrecision(4) + " deg\n";
    summary += "\n";
    
    //fork
    fork.xct = hs.xbb;
    fork.yct = hs.ybb;
    fork.xcb = hs.xbb - fork.offset - 1 / Math.tan(ht.angle*Math.PI/180) * hs.ybb;
    fork.ycb = 0;
    fork.angle = angle_from_line(fork.xcb, fork.ycb, fork.xct, fork.yct);
    fork.length = length_from_line(fork.xcb, fork.ycb, fork.xct, fork.yct);

    summary += "fork length: " + fork.length.toPrecision(4) + " mm\n";
    summary += "\n";

    cranks.angle = angle_from_line(bb.xc, bb.yc, fork.xcb, fork.ycb);
    cranks.xc = bb.xc;
    cranks.yc = bb.yc;
    cranks.xce = bb.xc + cranks.length*Math.cos(cranks.angle*Math.PI/180);
    cranks.yce = bb.yc + cranks.length*Math.sin(cranks.angle*Math.PI/180);
    cranks.radius = 12.7 / Math.sin(Math.PI/cranks.teeth) / 2;

    pedals.angle = cranks.angle;

    //console.log("pedals.angle ", pedals.angle);
    
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

    summary += "wheelbase: " + (r_wheel.xc - f_wheel.xc).toPrecision(4) + " mm\n"; 
    summary += "\n";

    //zrobic cos z tym
    let ground_level = f_wheel.yc - f_wheel.diameter/2 - f_wheel.tyre;
    let top_tube_top = st.yct + tt.diameter /2;
    
    summary += "standover height at tt-st joint: " + (top_tube_top - ground_level).toPrecision(4) + " mm\n"; 
    summary += "\n";    
    
    let ht_tt_angle = angle_from_vectors(ht.xcl - ht.xcu, ht.ycl - ht.ycu, 0,
        tt.xch - tt.xcs, tt.ych - tt.ycs, 0) *180 / Math.PI;
        
    summary += "head tube - seat tube angle: " + ht_tt_angle.toPrecision(4) + " deg\n"; 
    summary += "\n";  
    
    let ht_dt_angle = angle_from_vectors(ht.xcl - ht.xcu, ht.ycl - ht.ycu, 0,
        dt.xcb - dt.xct, dt.ycb - dt.yct, 0) *180 / Math.PI;
        
    summary += "head tube - down tube angle: " + ht_dt_angle.toPrecision(4) + " deg\n"; 
    summary += "\n";  
    
    let st_dt_angle = angle_from_vectors(st.xcb - st.xct, st.ycb - st.yct, 0,
        dt.xcb - dt.xct, dt.ycb - dt.yct, 0) *180 / Math.PI;
        
    summary += "seat tube - down tube angle: " + st_dt_angle.toPrecision(4) + " deg\n"; 
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
    let cs_angle = angle_from_line(bb.xc + bb.diameter/2, bb.yc - cs_dwg_offset + cs.bb_z_offset, dropout.xc - dropout.cs_offset_x, bb.yc - cs_dwg_offset + dropout.span/2 + dropout.thickness/2);
    let cs_length = length_from_line(bb.xc + bb.diameter/2, bb.yc - cs_dwg_offset + cs.bb_z_offset, dropout.xc - dropout.cs_offset_x, bb.yc - cs_dwg_offset + dropout.span/2 + dropout.thickness/2);
    draw_pipe(bb.xc + bb.diameter/2, bb.yc - cs_dwg_offset + cs.bb_z_offset, cs_length, cs_angle, cs.diameter);
    draw_pipe(bb.xc + bb.diameter/2, bb.yc - cs_dwg_offset - cs.bb_z_offset, cs_length, -cs_angle, cs.diameter);



    draw_line_scaled(bb.xc - bb.diameter/2, bb.yc - cs_dwg_offset + bb.width/2, bb.xc - bb.diameter/2, bb.yc - cs_dwg_offset - bb.width/2);


}

function gather_input()
{
    st.angle = parseFloat(document.getElementById("tf_st_angle").value);
    st.diameter = parseFloat(document.getElementById("tf_st_diameter").value);
    st.extra = parseFloat(document.getElementById("tf_st_extra").value);

    ht.angle = parseFloat(document.getElementById("tf_ht_angle").value);
    ht.diameter = parseFloat(document.getElementById("tf_ht_diameter").value);
    

}
