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

/* globalne */

/* podsiodłowa */
var st = {
        angle: 75, //in
        diameter: 28,
        length: 550, //560, //in
        extra: 30,
        xc: 0, //out
        yc: 0  //out      
    };

/* główka */
var ht = {
        angle: 74, //in
        diameter: 38,
        length: 35,// in c-c
        extra_top: 40, // in t-c
        extra_bottom: 40, // in b-c
        xcu: 0,
        ycu: 0,
        xcuu: 0,
        ycuu: 0,
        xcl: 0,
        ycl: 0,
        xcll: 0,
        ycll: 0
    };

/* stery */
var hs = {
        th: 11.3,
        td: 48,
        xct: 0,
        yct: 0,
        bh: 11.3,
        bd: 48,
        xcb: 0,
        ycb: 0
    };   

/* górna */
var tt = {
        angle: 180, //in
        diameter: 25,
        length: 560//560 //in
    };
    
/* koło */
var f_wheel = {
        diameter: 622, //in
        tyre: 35, //in
        xc: 0, //out
        yc: 0 //out
    };

/* koło */
var r_wheel = {
        diameter: 622, //in
        tyre: 35, //in
        xc: 0, //out
        yc: 0 //out
    };

/* suport */
var bb = {
        offset: 60, //in
        diameter: 38, //in
        width: 68, //in
        xc: 0, //out
        yc: 0 //out
    };

/* widełki dolne */
var cs = {
        offset: 400, //in
        diameter:18, //in
        bb_z_offset: 17, //in
        angle: 0, //out
        length: 0, //out
        xc: 0, //out
        yc: 0 //out
    };

var ss = {
        diameter: 12, //in
        angle: 0, //out
        length: 0, //out
        xc: 0, //out
        yc: 0 //out
    }

/* dolna */
var dt = {
        angle: 0, //out
        diameter: 28,
        length: 0 //out
    };

var fork = {
        offset: 50, // in
        diameter: 20, //in
        angle: 0, //out
        length: 0, // out
        xc: 0, //out
        yc: 0 //out
    };

var cranks = {
        length: 175, // in
        angle: 0, //out
        teeth: 50, //in
        radius: 0, //out
        chainline: 41.5, //in
        xc: 0, //out
        yc: 0 //out
    };

var pedals = {
        length: 95, //in
        angle: 0, //out
        xc: 0, //out
        yc: 0 //out
    };

var dropout = {
        ss_offset_x: 10, //in
        ss_offset_y: 20, //in
        cs_offset_x: 20, //in
        cs_offset_y: 0, //in
        span: 120, //in
        thickness: 5, //in
        length: 25, //in
        xc: 0, // out
        yc: 0 //out
    };

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x0 = canvas.width / 2 + 100;
var y0 = canvas.height / 2 - 50;

var scale = 1;//0.5;

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

function draw_pipe(x1,y1, length, angle, diameter)
{
    let dx = Math.cos((angle + 90)*Math.PI/180)*diameter/2;
    let dy = Math.sin((angle + 90)*Math.PI/180)*diameter/2;

    let x2 = x1 + Math.cos(angle*Math.PI/180) * length;
    let y2 = y1 + Math.sin(angle*Math.PI/180) * length;
    
    draw_line_scaled(x1, y1, x2, y2, "#00aaff");

    draw_line_scaled(x1 + dx, y1 + dy, x2 + dx, y2 + dy, "#00aaff");
    draw_line_scaled(x1 - dx, y1 - dy, x2 - dx, y2 - dy, "#00aaff");

    draw_line_scaled(x1 + dx, y1 + dy, x1 - dx, y1 - dy, "#00aaff");
    draw_line_scaled(x2 + dx, y2 + dy, x2 - dx, y2 - dy, "#00aaff");    
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

function calculate()
{
    bb.xc = 0;
    bb.yc = - bb.offset;

    st.xc = bb.xc + Math.cos(st.angle*Math.PI/180) * st.length;
    st.yc = bb.yc + Math.sin(st.angle*Math.PI/180) * st.length;

    ht.xcu = st.xc + Math.cos(tt.angle*Math.PI/180) * tt.length;
    ht.ycu = st.yc + Math.sin(tt.angle*Math.PI/180) * tt.length;

    ht.xcuu = ht.xcu + Math.cos(ht.angle*Math.PI/180) * ht.extra_top;
    ht.ycuu = ht.ycu + Math.sin(ht.angle*Math.PI/180) * ht.extra_top;

    hs.xct = ht.xcuu + Math.cos(ht.angle*Math.PI/180) * hs.th;
    hs.yct = ht.ycuu + Math.sin(ht.angle*Math.PI/180) * hs.th;

    ht.xcl = ht.xcu - Math.cos(ht.angle*Math.PI/180) * ht.length;
    ht.ycl = ht.ycu - Math.sin(ht.angle*Math.PI/180) * ht.length;

    ht.xcll = ht.xcl - Math.cos(ht.angle*Math.PI/180) * ht.extra_bottom;
    ht.ycll = ht.ycl - Math.sin(ht.angle*Math.PI/180) * ht.extra_bottom;

    hs.xcb = ht.xcll - Math.cos(ht.angle*Math.PI/180) * hs.bh;
    hs.ycb = ht.ycll - Math.sin(ht.angle*Math.PI/180) * hs.bh;

    console.log("ht.xcl ", ht.xcl);
    console.log("ht.ycl ", ht.ycl);
    console.log("bb.xc ", bb.xc);
    console.log("bb.yc ", bb.yc);

    dt.angle = angle_from_line(ht.xcl, ht.ycl, bb.xc, bb.yc);
    dt.length = length_from_line(ht.xcl, ht.ycl, bb.xc, bb.yc);

    console.log("dt length: ", dt.length);

    dropout.xc = bb.xc + cs.offset;
    dropout.yc = 0;

    cs.xc = dropout.xc - dropout.cs_offset_x;
    cs.yc = dropout.yc + dropout.cs_offset_y;
    cs.angle = angle_from_line(bb.xc, bb.yc, cs.xc, cs.yc);
    cs.length = length_from_line(bb.xc, bb.yc, cs.xc, cs.yc);

    ss.xc = dropout.xc - dropout.ss_offset_x;
    ss.yc = dropout.yc + dropout.ss_offset_y;
    ss.angle = angle_from_line(ss.xc, ss.yc, st.xc, st.yc);
    ss.length = length_from_line(ss.xc, ss.yc, st.xc, st.yc);

    fork.xc = hs.xcb - fork.offset - 1 / Math.tan(ht.angle*Math.PI/180) * hs.ycb;
    fork.yc = 0;
    fork.angle = angle_from_line(fork.xc, fork.yc, hs.xcb, hs.ycb);
    fork.length = length_from_line(fork.xc, fork.yc, hs.xcb, hs.ycb);

    console.log("fork length ", fork.length);

    cranks.angle = angle_from_line(bb.xc, bb.yc, fork.xc, fork.yc);
    cranks.xc = bb.xc + cranks.length*Math.cos(cranks.angle*Math.PI/180);
    cranks.yc = bb.yc + cranks.length*Math.sin(cranks.angle*Math.PI/180);
    cranks.radius = 12.7 / Math.sin(Math.PI/cranks.teeth) / 2;

    pedals.angle = cranks.angle;

    console.log("pedals.angle ", pedals.angle);
    
    pedals.xc = cranks.xc;// + pedals.length*Math.cos(pedals.angle);
    pedals.yc = cranks.yc;// + pedals.length*Math.sin(pedals.angle);

// do przełożenia gdzie indziej
    let xtmp = fork.xc + (f_wheel.diameter/2 + f_wheel.tyre)*Math.cos((cranks.angle+180)*Math.PI/180);
    let ytmp = fork.yc + (f_wheel.diameter/2 + f_wheel.tyre)*Math.sin((cranks.angle+180)*Math.PI/180);

    let xtmp2 = pedals.xc + pedals.length/2*Math.cos(pedals.angle*Math.PI/180);
    let ytmp2 = pedals.yc + pedals.length/2*Math.sin(pedals.angle*Math.PI/180);

    draw_line_scaled(xtmp, ytmp, xtmp2, ytmp2, "#000000");

    console.log("x tyre y tyre ", xtmp, " ", ytmp);
    console.log("x pedal y pedal ", xtmp2, " ", ytmp2);
    console.log("tyre-pedal distance: ", length_from_line(xtmp,ytmp,xtmp2,ytmp2)); 
// ~ do przełożenia gdzie indziej
    f_wheel.xc = fork.xc;
    f_wheel.yc = fork.yc;

    r_wheel.xc = dropout.xc;
    r_wheel.yc = dropout.yc;

    console.log("wheelbase: ", r_wheel.xc - f_wheel.xc);

    //zrobic cos z tym
    let ground_level = f_wheel.yc - f_wheel.diameter/2 - f_wheel.tyre;
    let top_tube_top = st.yc + tt.diameter /2;
    
    console.log("ground level: ", ground_level);
    console.log("standover height: ", top_tube_top - ground_level);
}

function rysuj()
{
    /* bb */
    draw_circle_scaled(bb.xc, bb.yc, bb.diameter/2,"#ff0000");

    /* cranks */
    draw_line_scaled(bb.xc, bb.yc, cranks.xc, cranks.yc);
    draw_circle_scaled(bb.xc, bb.yc, cranks.radius, "#bb0000");

    /* pedals */
    draw_line_scaled(
        pedals.xc - pedals.length/2*Math.cos(pedals.angle*Math.PI/180),
        pedals.yc - pedals.length/2*Math.sin(pedals.angle*Math.PI/180),
        pedals.xc + pedals.length/2*Math.cos(pedals.angle*Math.PI/180),
        pedals.yc + pedals.length/2*Math.sin(pedals.angle*Math.PI/180),
        "#00aa00");

    /* st */
    draw_pipe(bb.xc, bb.yc, st.length, st.angle, st.diameter);
    draw_pipe(st.xc, st.yc, st.extra, st.angle, st.diameter);


    /* tt */
    draw_pipe(st.xc, st.yc, tt.length, tt.angle, tt.diameter);

    /* ht */
    draw_pipe(ht.xcl, ht.ycl, ht.length, ht.angle, ht.diameter);
    draw_pipe(ht.xcll, ht.ycll, ht.extra_bottom, ht.angle, ht.diameter);
    draw_pipe(ht.xcu, ht.ycu, ht.extra_top, ht.angle, ht.diameter);
    /* hs */
    draw_pipe(ht.xcuu, ht.ycuu, hs.th, ht.angle, hs.td);
    draw_pipe(hs.xcb, hs.ycb, hs.bh, ht.angle, hs.bd);



    /* dt */

    draw_pipe(ht.xcl, ht.ycl, dt.length, -dt.angle, dt.diameter);

    //draw_line_scaled(
    //    ht.xcl, ht.ycl,
    //    bb.xc, bb.yc,
    //    "#222222");

    /* cs */
    //draw_line_scaled(
    //    bb.xc, bb.yc,
    //    cs.xc, cs.yc,        
    //    "#222222");

    draw_pipe(bb.xc, bb.yc, cs.length, cs.angle, cs.diameter);

    /* ss */
    //draw_line_scaled(
    //    cs.xc, cs.yc,
    //    st.xc, st.yc,             
    //    "#222222");

    draw_pipe(ss.xc, ss.yc, ss.length, ss.angle, ss.diameter);

    /* fork */

    draw_pipe(fork.xc, fork.yc, fork.length, fork.angle, fork.diameter);
    //draw_line_scaled(
    //    ht.xcll, ht.ycll,
    //    fork.xc, fork.yc,             
    //    "#222222");

    /* f wheel */
    draw_circle_scaled(f_wheel.xc, f_wheel.yc, f_wheel.diameter/2,"#ff0000");
    draw_circle_scaled(f_wheel.xc, f_wheel.yc, f_wheel.diameter/2 + f_wheel.tyre,"#ff0000");
    draw_circle_scaled(f_wheel.xc, f_wheel.yc, 5,"#000000");


    /* r wheel */
    draw_circle_scaled(r_wheel.xc, r_wheel.yc, r_wheel.diameter/2,"#ff0000");
    draw_circle_scaled(r_wheel.xc, r_wheel.yc, r_wheel.diameter/2 + r_wheel.tyre,"#ff0000");
    draw_circle_scaled(r_wheel.xc, r_wheel.yc, 5,"#000000");

    /* dropout */
    draw_line_scaled(dropout.xc - dropout.cs_offset_x, dropout.yc + dropout.cs_offset_y,
        dropout.xc - dropout.ss_offset_x, dropout.yc + dropout.ss_offset_y,
        "#000000");

    draw_line_scaled(dropout.xc - dropout.ss_offset_x, dropout.yc + dropout.ss_offset_y,
        dropout.xc + dropout.length, dropout.yc+5,
        "#000000");

    draw_line_scaled(dropout.xc + dropout.length, dropout.yc+5,
        dropout.xc, dropout.yc+5,
        "#000000");

    draw_line_scaled(dropout.xc + dropout.length, dropout.yc-5,
        dropout.xc, dropout.yc-5,
        "#000000");

    draw_line_scaled(dropout.xc - dropout.ss_offset_x, dropout.yc - dropout.ss_offset_y,
        dropout.xc + dropout.length, dropout.yc-5,
        "#000000");

    draw_line_scaled(dropout.xc - dropout.ss_offset_x, dropout.yc - dropout.ss_offset_y,
        dropout.xc - dropout.cs_offset_x, dropout.yc + dropout.cs_offset_y,
        "#000000");

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

function rysuj_widelki()
{
    
}
