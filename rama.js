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
/* suport / bottom bracket */
/******************************************************************************/
var bb = {

    offset: 60, //in, bb drop
    diameter: 38, //in
    width: 68, //in
    xc: 0, //out
    yc: 0, //out
    color: "#dd0000",

    /*
     * dependencies: none
     */
    calculate: function() {
        this.xc = 0;
        this.yc = - this.offset;
    },

    description: function() {
        desc  = "bottom bracket drop / obniżenie suportu: " + this.offset.toPrecision(4) + " mm\n";
        desc += "bottom bracket width / szerokość mufy suportu: " + this.width.toPrecision(4) + " mm\n";
        desc += "bottom bracket diameter / średnica mufy suportu: " + this.diameter.toPrecision(4) + " mm\n";
        desc += "\n";
        return desc;
    },

    draw: function() {
        draw_circle_scaled(this.xc, this.yc, this.diameter/2, this.color);
    },

    draw_cs_dwg: function(cs_dwg_offset) {
        draw_pipe(this.xc - this.diameter/2,
        this.yc - cs_dwg_offset,
        this.diameter,
        0,
        this.width,
        this.color);

        draw_line_scaled(bb.xc,
            bb.yc - cs_dwg_offset + bb.width/2,
            bb.xc,
            bb.yc - cs_dwg_offset - bb.width/2,
            this.color);
    }
};

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

    /*
     * dependencies: bb
     */
    calculate: function() {
        this.xcb = bb.xc;
        this.ycb = bb.yc;
        this.xct = bb.xc + Math.cos(st.angle*Math.PI/180) * st.length;
        this.yct = bb.yc + Math.sin(st.angle*Math.PI/180) * st.length;
    },

    description: function() {
        desc  = "seat tube length c-c / długość rury podsiodłowej środek - środek: " + this.length.toPrecision(4) + " mm\n";
        desc += "seat tube length c-t / długość rury podsiodłowej środek - koniec: " + (this.length + this.extra).toPrecision(4) + " mm\n";
        desc += "seat tube angle with ground / kąt rury podsiodłowej względem podłoża: " + this.angle.toPrecision(4) + " deg\n";
        desc += "seat tube diameter / średnica rury podsiodłowej: " + this.diameter.toPrecision(4) + " mm\n"; 
        desc += "\n";
        return desc;
    },

    draw: function() {
        draw_pipe(this.xcb, this.ycb, this.length, this.angle, this.diameter, this.color);
        draw_pipe(this.xct, this.yct, this.extra, this.angle, this.diameter, this.color);
    }
};

/******************************************************************************/
/* górna / top tube*/
/******************************************************************************/
var tt = {

    angle: 180, //in
    diameter: 25, //in
    length: 560,//560 //in
    xcs: 0, //out, x of center of seat tube side
    ycs: 0, //out, y of center of seat tube side
    xch: 0, //out, head tube side
    ych: 0, //out, head tube side
    color: "#0000ee",

    /*
     * dependencies: st
     */
    calculate: function() {
        this.xcs = st.xct;
        this.ycs = st.yct;
        this.xch = tt.xcs + Math.cos(tt.angle*Math.PI/180) * tt.length;
        this.ych = tt.ycs + Math.sin(tt.angle*Math.PI/180) * tt.length;
    },

    description: function() {
        desc  = "top tube length c-c / długość rury górnej środek - środek: " + this.length.toPrecision(4) + " mm\n";
        desc += "top tube angle with ground / kąt rury górnej względem podłoża: " + (this.angle - 180).toPrecision(4) + " deg\n";
        desc += "top tube diameter / średnica rury górnej: " + this.diameter.toPrecision(4) + " mm\n";
        desc += "\n";
        return desc;
    },

    draw: function() {
        draw_pipe(this.xcs, this.ycs, tt.length, tt.angle, tt.diameter, this.color);
    }
};

/******************************************************************************/
/* główka / headtube */
/******************************************************************************/
var ht = {

    angle: 74.5, //in
    diameter: 38, //in, external diameter
    length: 45,// in c-c, length between st and dt centers
    extra_top: 40, // in t-c
    extra_bottom: 40, // in b-c
    xcu: 0, //out, x center up
    ycu: 0, //out, y center up
    xcuu: 0, //out, x upper up
    ycuu: 0, //out, y upper up
    xcl: 0, //out, x center low
    ycl: 0, //out, y center low
    xcll: 0, //out, x lower low
    ycll: 0, //out, y lower low
    color: "#000055",

    /*
     * dependencies: tt
     */
    calculate: function() {
        this.xcu = tt.xch;
        this.ycu = tt.ych;
        this.xcuu = this.xcu + Math.cos(this.angle*Math.PI/180) * this.extra_top;
        this.ycuu = this.ycu + Math.sin(this.angle*Math.PI/180) * this.extra_top;
        this.xcl = this.xcu - Math.cos(this.angle*Math.PI/180) * this.length;
        this.ycl = this.ycu - Math.sin(this.angle*Math.PI/180) * this.length;
        this.xcll = this.xcl - Math.cos(this.angle*Math.PI/180) * this.extra_bottom;
        this.ycll = this.ycl - Math.sin(this.angle*Math.PI/180) * this.extra_bottom;
    },

    description: function() {
        desc  = "head tube length c-c / długość główki ramy środek - środek: " + this.length.toPrecision(4) + " mm\n";
        desc += "head tube length total / długość całkowita główki ramy: " + (this.length + this.extra_top + this.extra_bottom).toPrecision(4) + " mm\n";
        desc += "head tube extra length top / długość górnego naddatku główki ramy: " + this.extra_top.toPrecision(4) + " mm\n";
        desc += "head tube extra length bottom / długość dolnego naddatku główki ramy: " + this.extra_bottom.toPrecision(4) + " mm\n";
        desc += "head tube angle with ground / kąt główki ramy względem podłoża: " + this.angle.toPrecision(4) + " deg\n";
        desc += "head tube diameter / średnica główki ramy: " + this.diameter.toPrecision(4) + " mm\n";
        desc += "\n";
        return desc;
    },

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

    /*
     * dependencies: ht
     */
    calculate: function() {
        this.angle = ht.angle;
        this.xt = ht.xcuu;
        this.yt = ht.ycuu;
        this.xtt = this.xt + Math.cos(this.angle*Math.PI/180) * this.th;
        this.ytt = this.yt + Math.sin(this.angle*Math.PI/180) * this.th;
        this.xb = ht.xcll;
        this.yb = ht.ycll;
        this.xbb = this.xb - Math.cos(this.angle*Math.PI/180) * this.bh;
        this.ybb = this.yb - Math.sin(this.angle*Math.PI/180) * this.bh;
    },

    description: function() {
        desc  = "headset top height / wysokość górnego łożyska sterów: " + this.th.toPrecision(4) + " mm\n";
        desc += "headset top diameter / średnica górnego łożyska sterów: " + this.td.toPrecision(4) + " mm\n";
        desc += "headset bottom height / wysokość dolnego łożyska sterów: " + this.bh.toPrecision(4) + " mm\n";
        desc += "headset bottom diameter / średnica dolnego łożyska sterów: " + this.bd.toPrecision(4) + " mm\n";
        desc += "\n";
        return desc;
    },

    draw: function() {
        draw_pipe(this.xt, this.yt, this.th, ht.angle, this.td, this.color);
        draw_pipe(this.xbb, this.ybb, this.bh, ht.angle, this.bd, this.color);
    }
};   

/******************************************************************************/
/* dolna / down tube */
/******************************************************************************/
var dt = {
    angle: 0, //out
    diameter: 28, // in
    xcb: 0, // out, x of center on bb
    ycb: 0, // out, y of center on bb
    xct: 0, // out, x of center on ht
    yct: 0, // out, y of center on ht
    length: 0, //out, real length
    // z is zero for this tube
    color: "#000066",

    /*
     * dependencies: bb, ht
     */
    calculate: function() {
        this.xcb = bb.xc;
        this.ycb = bb.yc;
        this.xct = ht.xcl;
        this.yct = ht.ycl;
        this.angle = angle_from_line(this.xct, this.yct,
            this.xcb, this.ycb);
        this.length = length_from_line(this.xct, this.yct,
            this.xcb, this.ycb);
    },

    description: function() {
        desc  = "down tube length c-c / długość rury dolnej środek-środek: " + this.length.toPrecision(4) + " mm\n";
        desc += "down tube angle with ground / kąt rury dolnej względem podłoża: " + this.angle.toPrecision(4) + " deg\n";
        desc += "down tube diameter / średnica rury dolnej: " + this.diameter.toPrecision(4) + " mm\n";
        desc += "\n";
    },

    draw: function() {
        draw_pipe(this.xct, this.yct, this.length, - this.angle, this.diameter, this.color);
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
    color: "#000000", //in

    /*
     * dependencies: bb
     */
    calculate: function() {
        this.xc = bb.xc + this.offset;
        this.yc = 0;
    },

    description: function() {
        desc  = "dropout offset to bottom bracket / przesunięcie haków od suportu: " + this.offset.toPrecision(4) + " mm\n";
        desc += "dropout span / rozstaw haków: " + this.span.toPrecision(4) + " mm\n";
        desc += "dropout thickness / grubość haków: " + this.thickness.toPrecision(4) + " mm\n";
        desc += "dropout length / długość haków: " + this.length.toPrecision(4) + " mm\n";
        desc += "dropout seatstay offset x / przesunięcie górnych widełek na haku x: " + this.ss_offset_x.toPrecision(4) + " mm\n";
        desc += "dropout seatstay offset y / przesunięcie górnych widełek na haku y: " + this.ss_offset_y.toPrecision(4) + " mm\n";
        desc += "dropout chainstay offset x / przesunięcie dolnych widełek na haku x: " + this.cs_offset_x.toPrecision(4) + " mm\n";
        desc += "dropout chainstay offset y / przesunięcie dolnych widełek na haku y: " + this.cs_offset_y.toPrecision(4) + " mm\n";
        desc += "\n";
        return desc;
    },

    draw: function() {
        draw_pipe(this.xc, this.yc, this.length, 0, 10, this.color);
        
        draw_line_scaled(this.xc, this.yc, this.xc, this.yc+this.ss_offset_y, this.color);
        draw_line_scaled(this.xc, this.yc+this.ss_offset_y, this.xc-this.ss_offset_x, this.yc+this.ss_offset_y, this.color);
        
        draw_line_scaled(this.xc, this.yc, this.xc, this.yc+this.cs_offset_y, this.color);
        draw_line_scaled(this.xc, this.yc+this.cs_offset_y, this.xc-this.cs_offset_x, this.yc+this.cs_offset_y, this.color);
    },

    draw_cs_dwg: function(cs_dwg_offset) {

        draw_pipe(this.xc - this.cs_offset_x,
            bb.yc - cs_dwg_offset + this.span/2 + this.thickness/2,
            this.cs_offset_x + this.length,
            0, //angle
            this.thickness,
            this.color);

        draw_pipe(this.xc - this.cs_offset_x,
            bb.yc - cs_dwg_offset - this.span/2 - this.thickness/2,
            this.cs_offset_x + this.length,
            0, //angle
            this.thickness,
            this.color);
    }
};

/******************************************************************************/
/* widełki dolne / chainstays */
/******************************************************************************/
var cs = {
    diameter:18, //in
    bb_z_offset: 17, //in, offset of cs center from bb center line
    angle: 0, //out, angle on the main drawing
    angle_xz: 0, //out
    angle_to_bb: 0, //out
    angle_to_dropout: 0, //out
    length_xy: 0, //out, length on the main drawing
    length_xz: 0, //out
    length_total: 0, //out, real length
    xcd: 0, //out, x of center on dropout
    ycd: 0, //out, y of center on dropout
    zcd: 0, //out, z of center on dropout
    xcb: 0, //out, x of center on bb
    ycb: 0, //out, y of center on bb
    zcb: 0, //out, z of center on bb
    color: "#0000ff",

    /*
     * dependencies: bb, dropout
     */
    calculate: function() {
        this.xcd = dropout.xc - dropout.cs_offset_x;
        this.ycd = dropout.yc + dropout.cs_offset_y;
        this.zcd = dropout.span/2 + dropout.thickness/2;
        this.xcb = bb.xc;
        this.ycb = bb.yc;
        this.zcb = this.bb_z_offset;
        this.angle = angle_from_line(this.xcb, this.ycb, this.xcd, this.ycd);
        this.length_xy = length_from_line(this.xcb, this.ycb, this.xcd, this.ycd);
        this.length_xz = length_from_line(this.xcb, this.zcb, this.xcd, this.zcd);
        this.length_total = vector_length(this.xcd - this.xcb, this.ycd - this.ycb, this.zcd - this.zcb);
        
        this.angle_to_bb = angle_from_vectors(0, 0, 1, // the bottom bracket axis is purely in z
            this.xcd - this.xcb, this.ycd - this.ycb, this.zcd - this.zcb) *180 / Math.PI;
        
        this.angle_xz = 90 - angle_from_vectors(0, 0, 1,
            this.xcd - this.xcb, 0, this.zcd - this.zcb) *180/Math.PI;

        this.angle_to_dropout = 90 - this.angle_to_bb;
    },

    description: function() {
        desc  = "chainstay diameter / średnica widełek dolnych: " + this.diameter.toPrecision(4) + " mm\n";
        desc += "chainstay bb z-axis offset / przesunięcie widełek dolnych po suporcie w osi z: " + this.bb_z_offset.toPrecision(4) + " mm\n";
        desc += "chainstay real length / rzeczywista długość dolnych widełek: " + this.length_total.toPrecision(4) + " mm\n";
        desc += "chainstay angle to bottom bracket / kąt pomiędzy dolnymi widełkami a suportem: " + this.angle_to_bb.toPrecision(4) + " deg\n";
        desc += "chainstay angle to dropout plane / kąt pomiędzy dolnymi widełkami a płaszczyzną haków: " + this.angle_to_dropout.toPrecision(4) + " deg\n";
        desc += "chainstay angle to ground in projection to dropout plane / kąt pomiędzy dolnymi widełkami w rzucie na płaszczyznę haków a podłożem: " + this.angle.toPrecision(4) + " deg\n";
        desc += "\n";
        return desc;
    },

    draw: function() {
        draw_pipe(this.xcb, this.ycb, this.length_xy, this.angle, this.diameter, this.color);
    },

    draw_cs_dwg: function(cs_dwg_offset) {

        draw_pipe(bb.xc,
            bb.yc - cs_dwg_offset + this.bb_z_offset,
            this.length_xz,
            this.angle_xz,
            this.diameter,
            this.color);

        draw_pipe(bb.xc,
            bb.yc - cs_dwg_offset - this.bb_z_offset,
            this.length_xz,
            - this.angle_xz,
            this.diameter,
            this.color);

        // cs real length
        draw_pipe(this.xcd,
            dropout.yc - 2 * cs_dwg_offset + dropout.span/2 + dropout.thickness/2,
            this.length_total,
            180 + this.angle_to_dropout,
            this.diameter,
            this.color);

        draw_pipe(this.xcd,
            dropout.yc - 2 * cs_dwg_offset - dropout.span/2 - dropout.thickness/2,
            this.length_total,
            180 - this.angle_to_dropout,
            this.diameter,
            this.color);

        draw_dimension_scaled(this.xcd,
            dropout.yc - 2 * cs_dwg_offset + dropout.span/2 + dropout.thickness/2,
            "cs real length / dł. rzeczywista d. widełek: " + this.length_total.toPrecision(4),
            40,
            this.color);
    }
};

/******************************************************************************/
/* widełki górne / seatstays */
/******************************************************************************/
var ss = {
    diameter: 12, //in
    angle: 0, //out, angle on main drawing
    angle_to_st: 0, //out, real angle with st
    angle_to_dropout: 0, //out, real angle with dropout plane
    length_xy: 0, //out, length of projection onto xy plane, so main drawing
    length_total: 0, //out, real length
    xcd: 0, //out
    ycd: 0, //out
    zcd: 0, //out
    xct: 0, //out
    yct: 0, //out
    zct: 0, //out
    st_z_offset: 8, //in, offset from center of st in z (horizontal) axis
    st_lwise_offset: 0, //in, lengthwise offset from st-tt joint in bb direction 
    color: "#000099",

    /*
     * dependencies: bb, st, dropout
     */
    calculate: function() {
        this.xcd = dropout.xc - dropout.ss_offset_x;
        this.ycd = dropout.yc + dropout.ss_offset_y;
        this.zcd = dropout.span/2 + dropout.thickness/2;
    
        this.xct = bb.xc + Math.cos(st.angle*Math.PI/180) * (st.length - this.st_lwise_offset);
        this.yct = bb.yc + Math.sin(st.angle*Math.PI/180) * (st.length - this.st_lwise_offset);
        this.zct = this.st_z_offset;
    
        this.angle = angle_from_line(this.xcd, this.ycd, this.xct, this.yct);
        this.length_xy = length_from_line(this.xcd, this.ycd, this.xct, this.yct);
    
        this.length_total = vector_length(this.xct - this.xcd, this.yct - this.ycd, this.zct, this.zcd);
    
        this.angle_to_st = angle_from_vectors(
            st.xct - st.xcb, st.yct - st.ycb, 0, // seat tube has zero diff in z axis
            this.xct - this.xcd, this.yct - this.ycd, this.zct - this.zcd) *180 / Math.PI;
        
        this.angle_to_dropout = angle_from_vectors(
            0, 0, 1, // z axis is perpendicular to dropout plane
            this.xct - this.xcd, this.yct - this.ycd, this.zct - this.zcd) *180 / Math.PI;
    
        /* calculated above was actually angle to axis perpendicular to dropout plane */
        this.angle_to_dropout = this.angle_to_dropout - 90;
    },

    description: function() {
        desc  = "seatstay diameter / średnica widełek górnych: " + this.diameter.toPrecision(4) + " mm\n";
        desc += "seatstay st z-axis offset / przesunięcie widełek górnych po rurze podsiodłowej w osi z: " + this.st_z_offset.toPrecision(4) + " mm\n";
        desc += "seatstay seat tube lenghtwise offset / przesunięcie górnych widełek wzdłuż rury podsiodłowej: " + this.st_lwise_offset.toPrecision(4) + " mm\n";
        desc += "seatstay real length / rzeczywista długość górnych widełek: " + this.length_total.toPrecision(4) + " mm\n";
        desc += "seatstay angle to ground in projection to dropout plane / kąt pomiędzy górnymi widełkami w rzucie na płaszczyznę haków a podłożem: " + (180 - this.angle).toPrecision(4) + " deg\n";
        desc += "seatstay angle to seat tube / kąt pomiędzy górnymi widełkami a rurą podsiodłową: " + this.angle_to_st.toPrecision(4) + " deg\n";
        desc += "seatstay angle to dropout plane / kąt pomiędzy górnymi widełkami a płaszczyzną haków: " + this.angle_to_dropout.toPrecision(4) + " deg\n";
        desc += "\n";
        return desc;
    },
    
    draw: function() {
        draw_pipe(this.xcd, this.ycd, this.length_xy, this.angle, this.diameter, this.color);
    }
}

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

    /*
     * dependencies: hs, ht,
     */
    calculate: function() {
        this.xct = hs.xbb;
        this.yct = hs.ybb;
        this.xcb = hs.xbb - this.offset - 1 / Math.tan(ht.angle*Math.PI/180) * hs.ybb;
        this.ycb = 0;
        this.angle = angle_from_line(this.xcb, this.ycb, this.xct, this.yct);
        this.length = length_from_line(this.xcb, this.ycb, this.xct, this.yct);
    },

    description: function() {
        desc  = "fork length / długość widelca: " + this.length.toPrecision(4) + " mm\n";
        desc += "fork offset / wyprzedzenie widelca: " + this.offset.toPrecision(4) + " mm\n";
        desc += "\n";
        return desc;
    },

    draw: function() {
        draw_pipe(this.xcb, this.ycb, this.length, this.angle, this.diameter, this.color);
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
    crank_z_internal: 46, //in, not used yet
    crank_z_external: 56, //in, not used yet
    xc: 0, //out, x of the center of the crank
    yc: 0, //out, y of the center of the crank
    xce: 0, // out, x of the end of the crank
    yce: 0, // out, y of the end of the crank
    color: "#000000",

    /*
     * dependencies: bb, fork
     */
    calculate: function() {
        this.angle = angle_from_line(bb.xc, bb.yc, fork.xcb, fork.ycb);
        this.xc = bb.xc;
        this.yc = bb.yc;
        this.xce = bb.xc + this.length*Math.cos(this.angle*Math.PI/180);
        this.yce = bb.yc + this.length*Math.sin(this.angle*Math.PI/180);
        /* wzór na promień blatu */ 
        this.radius = 12.7 / Math.sin(Math.PI/this.teeth) / 2;
    },

    description: function() {
        desc  = "cranks length / długość korb: " + this.length.toPrecision(4) + " mm\n";
        desc += "chainring teeth / ilość zębów zębatki na korbie: " + this.teeth.toPrecision(4) + " teeth/zębów\n";
        desc += "chainline / linia łańcucha: " + this.chainline.toPrecision(4) + " mm\n";
        desc += "\n";
        return desc;
    },

    draw: function() {
        draw_line_scaled(this.xc, this.yc, this.xce, this.yce, this.color);
        draw_circle_scaled(this.xc, this.yc, this.radius, this.color);
    },

    draw_cs_dwg: function(cs_dwg_offset) {
        //chainring
        draw_line_scaled(this.xc - this.radius,
            this.yc - cs_dwg_offset + this.chainline,
            this.xc + this.radius,
            this.yc - cs_dwg_offset + this.chainline,
            this.color);
    }

};

/******************************************************************************/
/* pedały / pedals */
/******************************************************************************/
var pedals = {

    length: 95, //in
    angle: 0, //out
    z_internal: 82, //in, not used yet
    z_external: 162, //in, not used yet
    xc: 0, //out
    yc: 0, //out
    color: "#00aa00",

    /*
     * dependencies: cranks,
     */
    calculate: function() {
        this.angle = cranks.angle;    
        this.xc = cranks.xce;
        this.yc = cranks.yce;
    },

    description: function() {
        desc  = "pedal length / długość pedałów: " + pedals.length.toPrecision(4) + " mm\n";
        desc += "\n";
        return desc;
    },

    draw: function() {
        
        draw_pipe(this.xc - this.length/2*Math.cos(this.angle*Math.PI/180),
            this.yc - this.length/2*Math.sin(this.angle*Math.PI/180),
            this.length,
            this.angle,
            20,
            this.color);
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
    kolor: "#6600ff",

    /*
     * dependencies: fork,
     */
    calculate: function() {
        this.xc = fork.xcb;
        this.yc = fork.ycb;
    },

    description: function() {
        desc  = "front wheel rim diameter / średnica obręczy koła przedniego: " + this.diameter.toPrecision(4) + " mm\n";
        desc += "front wheel tyre width / profil opony koła przedniego: " + this.tyre.toPrecision(4) + " mm\n";
        desc += "\n";
        return desc;
    },

    draw: function() {
        draw_circle_scaled(this.xc, this.yc, this.diameter/2, this.kolor);
        draw_circle_scaled(this.xc, this.yc, this.diameter/2 + this.tyre, this.kolor);
        draw_circle_scaled(this.xc, this.yc, 5, this.kolor);
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
    kolor: "#ff0066",

    /*
     * dependencies: dropout,
     */
    calculate: function() {
        this.xc = dropout.xc;
        this.yc = dropout.yc;
    },

    description: function() {
        desc  = "rear wheel rim diameter / średnica obręczy koła tylnego: " + this.diameter.toPrecision(4) + " mm\n";
        desc += "rear wheel tyre width / profil opony koła tylnego: " + this.tyre.toPrecision(4) + " mm\n";
        desc += "\n";
        return desc;
    },
    
    /* copy from the front */
    draw: f_wheel.draw,

    draw_cs_dwg: function(cs_dwg_offset) {
        //r_wheel axel
        draw_line_scaled(this.xc,
            bb.yc - cs_dwg_offset + dropout.span/2,
            this.xc,
            bb.yc - cs_dwg_offset - dropout.span/2,
            this.kolor);
        
        // tyre in the real-dimension drawing
        draw_circle_scaled(this.xc - this.diameter/2 - this.tyre/2,
            dropout.yc - 2 * cs_dwg_offset,
            this.tyre/2,
            this.kolor);
    }
};

/******************************************************************************/
/* cs & ss cross-beams / poprzeczki widełek */
/******************************************************************************/
var cb_cs = {
    distance: 366, //in
    diameter: 18, //in
    kolor: "#777700", //in
    
    description: function() {
        desc  = "chainstay cross-beam diameter, distance / średnica, odległość poprzeczki widełek dolnych: " +this.diameter + ", " +this.distance + "\n";
        desc += "\n";
        return desc;
    },

    draw_cs_dwg: function(cs_dwg_offset)
    {
        // cs cross-beam
        draw_pipe(dropout.xc - this.distance,
            dropout.yc - 2 * cs_dwg_offset - dropout.span/2 /*- dropout.thickness/2*/,
            dropout.span, 90,
            this.diameter,
            this.kolor);
    }

};
    

var cb_ss = {
    distance: 366, //in
    diameter: 12, //in

    description: function() {
        desc  = "seatstay cross-beam diameter, distance / średnica, odległość poprzeczki widełek górnych: " +this.diameter + ", " +this.distance + "\n";
        desc += "\n";
        return desc;
    }
};


/******************************************************************************/
/* other dimensions' drawings / rysunki innych wielkości */
/******************************************************************************/

/******************************************************************************/
/* tyre pedal distance / odległość od opony do pedałów */
/******************************************************************************/
var tyre_pedal_dist = {
    xf: 0, //out
    yf: 0, //out
    xp: 0, //out
    yp: 0, //out
    tpd: 0, //out
    
    /*
     * dependencies: fork, f_wheel, cranks, pedals
     */
    calculate: function() {
        this.xf = fork.xcb + (f_wheel.diameter/2 + f_wheel.tyre)*Math.cos((cranks.angle+180)*Math.PI/180);
        this.yf = fork.ycb + (f_wheel.diameter/2 + f_wheel.tyre)*Math.sin((cranks.angle+180)*Math.PI/180);
        this.xp = pedals.xc + pedals.length/2*Math.cos(pedals.angle*Math.PI/180);
        this.yp = pedals.yc + pedals.length/2*Math.sin(pedals.angle*Math.PI/180);
        this.tpd = length_from_line(this.xf,this.yf, this.xp,this.yp);
    },

    description: function() {
        desc  = "tyre-pedal distance / odległość opony od pedałów: " + this.tpd.toPrecision(4) + " mm\n"; 
        desc += "\n";
        return desc;
    },

    draw: function() {
        draw_line_scaled(this.xf, this.yf, this.xp, this.yp, "#bb00bb");
        draw_dimension_scaled(this.xf, this.yf, "odl. opona-pedał: " + this.tpd.toPrecision(4), 40, "#008800")
    }
};

/******************************************************************************/
/* wheelbase / rozstaw osi */
/******************************************************************************/
var wheelbase = {
    xf: 0, //out
    yf: 0, //out
    xr: 0, //out
    yr: 0, //out
    wb: 0, //out
    color: "#ff00ff",
    
    /*
     * dependencies: f_wheel, r_wheel
     */
    calculate: function() {
        this.xf = f_wheel.xc;
        this.yf = f_wheel.yc;
        this.xr = r_wheel.xc;
        this.yr = r_wheel.yc;
        this.wb = this.xr - this.xf;
    },

    description: function() {
        desc  = "wheelbase / rozstaw osi: " + this.wb.toPrecision(4) + " mm\n";  
        desc += "\n";
        return desc;
    },

    draw: function() {
        draw_line_scaled(this.xf, this.yf, this.xr, this.yr, this.color);
    },

    draw_cs_dwg: function(cs_dwg_offset)
    {
        /* center line / oś wzdłużna ramy */
        draw_line_scaled(f_wheel.xc, bb.yc - cs_dwg_offset, r_wheel.xc, bb.yc - cs_dwg_offset, this.color);
    }
};

/******************************************************************************/
/* standover / przekrok */
/******************************************************************************/
var standover = {
    xt: 0, //out
    yt: 0, //out
    xb: 0, //out
    yb: 0, //out
    standover_height: 0, //out
    top_tube_top_at_bb:0, //out
    bb_bottom_to_ground: 0, //out

    /*
     * dependencies: f_wheel, tt, 
     */
    calculate: function() {

        this.top_tube_top_at_bb = (Math.tan(-tt.angle*Math.PI/180) * (tt.xcs - bb.xc)) + tt.ycs + (tt.diameter/2);
        this.ground_level = f_wheel.yc - (f_wheel.diameter/2) - f_wheel.tyre;
        this.standover_height = this.top_tube_top_at_bb - this.ground_level;
        this.bb_bottom_to_ground = bb.yc - bb.diameter/2 - this.ground_level;

        this.xt = bb.xc;
        this.yt = this.top_tube_top_at_bb;
        this.xb = this.xt;
        this.yb = this.ground_level;
    },

    description: function() {
        desc  = "standover height at bb / wysokość przekroku ramy na wysokości suportu: " + this.standover_height.toPrecision(4) + " mm\n";
        desc += "bottom bracket bottom to ground / wysokość dołu suportu do ziemii: " + this.bb_bottom_to_ground.toPrecision(4) + " mm\n"; 
        desc += "\n"; 
        return desc;
    },

    draw: function() {
        draw_line_scaled(this.xt, this.yt, this.xb, this.yb, "#008800");
        draw_dimension_scaled(this.xt, this.yt, "przekrok: " + this.standover_height.toPrecision(4), 40, "#008800")
        draw_line_scaled(f_wheel.xc, this.ground_level, r_wheel.xc, this.ground_level, "#008800");
    }
};

/******************************************************************************/
/* head tube-top tube angle / kąt główka-górna */
/******************************************************************************/
var ht_tt_angle = {
    xc: 0, //out
    yc: 0, //out
    angle: 0, //out
    /*
     * dependencies: ht, tt, 
     */
    calculate: function() {
        this.xc = ht.xcu;
        this.yc = ht.ycu;

        this.angle = angle_from_vectors(ht.xcl - ht.xcu, ht.ycl - ht.ycu, 0,
        tt.xch - tt.xcs, tt.ych - tt.ycs, 0) *180 / Math.PI;
    },

    description: function() {
        desc  = "head tube-top tube angle / kąt główka-górna: " + this.angle.toPrecision(4) + " deg"; 
        desc += "\n"; 
        return desc;
    },

    draw: function() {
        draw_arc_scaled(this.xc,this.yc, ht.length/2, -ht.angle*Math.PI/180, (-tt.angle - 180)*Math.PI/180, "#aa0000");
        draw_dimension_scaled(this.xc, this.yc, "kąt główka-górna: " + this.angle.toPrecision(4) + "st", ht.diameter, "#aa0000")
    }
};

/******************************************************************************/
/* head tube-down tube angle / kąt główka-dolna */
/******************************************************************************/
var ht_dt_angle = {
    xc: 0, //out
    yc: 0, //out
    angle: 0, //out
    /*
     * dependencies: f_wheel, tt, 
     */
    calculate: function() {
        this.xc = ht.xcl;
        this.yc = ht.ycl;

        this.angle = angle_from_vectors(ht.xcl - ht.xcu, ht.ycl - ht.ycu, 0,
            dt.xcb - dt.xct, dt.ycb - dt.yct, 0) *180 / Math.PI;
    },

    description: function() {
        desc  = "head tube - down tube angle / kąt pomiędzy główką ramy a rurą dolną: " + this.angle.toPrecision(4) + " deg\n"; 
        desc += "\n"; 
        return desc;
    },

    draw: function() {
        draw_arc_scaled(this.xc,this.yc, ht.length/2, (180-ht.angle-this.angle)*Math.PI/180, (180-ht.angle)*Math.PI/180, "#aa0000");
        draw_dimension_scaled(this.xc, this.yc, "kąt główka-dolna: " + this.angle.toPrecision(4) + "st", ht.diameter, "#aa0000")
    }
};

/******************************************************************************/
/* seat tube-down tube angle / kąt podsiodłowa-dolna */
/******************************************************************************/
var st_dt_angle = {
    xc: 0, //out
    yc: 0, //out
    angle: 0, //out
    /*
     * dependencies: dt, st, 
     */
    calculate: function() {
        this.xc = st.xcb;
        this.yc = st.ycb;

        this.angle = angle_from_vectors(st.xcb - st.xct, st.ycb - st.yct, 0,
            dt.xcb - dt.xct, dt.ycb - dt.yct, 0) *180 / Math.PI;
    },

    description: function() {
        desc  = "seat tube - down tube angle / kąt pomiędzy rurą podsiodłową a dolną: " + this.angle.toPrecision(4) + " deg\n"; 
        desc += "\n"; 
        return desc;
    },

    draw: function() {
        draw_arc_scaled(this.xc,this.yc, bb.diameter, (-st.angle-this.angle)*Math.PI/180, (-st.angle)*Math.PI/180, "#aa0000");
        draw_dimension_scaled(this.xc, this.yc, "kąt dolna-podsiodłowa: " + this.angle.toPrecision(4) + "st", bb.diameter, "#aa0000")
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

var scale = 1;

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

function draw_arc(x,y,r,angle_from,angle_to,kolor)
{
    if(resize_if_necessary(x-r, y-r, x+r, y+r)) return;

    ctx.beginPath();
    ctx.arc(x,y,r,angle_from,angle_to)
    ctx.lineWidth=1;
    ctx.strokeStyle=kolor;
    ctx.stroke();
}

function draw_arc_scaled(x,y,r,angle_from,angle_to,kolor)
{
    draw_arc(x0 + x*scale*pixels_per_mm,
        y0 - y*scale*pixels_per_mm,
        r*scale*pixels_per_mm,
        angle_from,
        angle_to,
        kolor);
}

function draw_circle(x,y,r,kolor)
{
    draw_arc(x,y,r, 0*Math.PI,2*Math.PI, kolor);
}

function draw_circle_scaled(x,y,r,kolor)
{
    draw_circle(
        x0 + x*scale*pixels_per_mm,
        y0 - y*scale*pixels_per_mm,
        r*scale*pixels_per_mm,
        kolor);
}

function draw_pipe(x1, y1, length, angle, diameter, color)
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

function draw_dimension_scaled(x,y, string, line_length, kolor)
{
    ODL_X = line_length/1.41;
    ODL_Y = line_length/1.41;

    draw_line_scaled(x, y, x + ODL_X, y + ODL_Y, kolor);

    ctx.font = "10px Arial";
    ctx.fillText(string, x0 + (x + ODL_X)*scale*pixels_per_mm, y0 - (y + ODL_Y)*scale*pixels_per_mm);
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

/******************************************************************************/
/* high level functionality */
/******************************************************************************/

function calculate()
{
    summary = "";
    
    bb.calculate(); summary += bb.description();
    st.calculate(); summary += st.description();
    tt.calculate(); summary += tt.description();
    ht.calculate(); summary += ht.description();
    hs.calculate(); summary += hs.description();
    dt.calculate(); summary += dt.description();
    dropout.calculate(); summary += dropout.description();
    cs.calculate(); summary += cs.description();
    ss.calculate(); summary += ss.description();
    fork.calculate(); summary += fork.description();
    cranks.calculate(); summary += cranks.description();
    pedals.calculate(); summary += pedals.description();
    f_wheel.calculate(); summary += f_wheel.description();
    r_wheel.calculate(); summary += r_wheel.description();
    tyre_pedal_dist.calculate(); summary += tyre_pedal_dist.description();
    wheelbase.calculate(); summary += wheelbase.description();
    standover.calculate(); summary += standover.description();
    ht_tt_angle.calculate(); summary += ht_tt_angle.description();
    ht_dt_angle.calculate(); summary += ht_dt_angle.description();
    st_dt_angle.calculate(); summary += st_dt_angle.description();
    /* cb_cs.calculate(); */ summary += cb_cs.description();
    /* cb_ss.calculate(); */ summary += cb_ss.description();

    document.getElementById("summary").innerHTML = summary;
}

function rysuj()
{
    wheelbase.draw();
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
    tyre_pedal_dist.draw();
    standover.draw();
    ht_tt_angle.draw();
    ht_dt_angle.draw();
    st_dt_angle.draw();

    /*************************************************************************/
    /* chainstay drawing */
    /*************************************************************************/

    let CS_DWG_OFFSET = 400;

    bb.draw_cs_dwg(CS_DWG_OFFSET);
    dropout.draw_cs_dwg(CS_DWG_OFFSET);
    wheelbase.draw_cs_dwg(CS_DWG_OFFSET);
    r_wheel.draw_cs_dwg(CS_DWG_OFFSET);
    cranks.draw_cs_dwg(CS_DWG_OFFSET);
    cs.draw_cs_dwg(CS_DWG_OFFSET);
    cb_cs.draw_cs_dwg(CS_DWG_OFFSET);
    
    //--------------------------------------------------------------------------
    //seatstay drawing 
    let ss_dwg_offset = 450;

    draw_line_scaled(ss_dwg_offset + dropout.xc - dropout.span/2 - dropout.thickness/2, dropout.yc,
        ss_dwg_offset + dropout.xc + dropout.span/2 + dropout.thickness/2, dropout.yc, "#000000");
        
        // cs cross-beam
    draw_pipe(ss_dwg_offset + dropout.xc - dropout.span/2 - dropout.thickness/2,
        dropout.yc + cb_ss.distance,
        dropout.span,
        0,
        cb_ss.diameter,
        "#777700");    
        
    draw_line_scaled(ss_dwg_offset + dropout.xc, dropout.yc,
        ss_dwg_offset + dropout.xc, dropout.yc + ss.length_total, "#000000");
    
    draw_pipe(ss_dwg_offset + dropout.xc - dropout.span/2 - dropout.thickness/2,
        ss.ycd, ss.length_total, 90 - ss.angle_to_dropout, ss.diameter, "#000000");

    draw_pipe(ss_dwg_offset + dropout.xc + dropout.span/2 + dropout.thickness/2,
        ss.ycd, ss.length_total, 90 + ss.angle_to_dropout, ss.diameter, "#000000");
        
    draw_circle_scaled(ss_dwg_offset + dropout.xc, dropout.yc + r_wheel.diameter/2 + r_wheel.tyre/2, r_wheel.tyre/2, "#FF0000");

    //--------------------------------------------------------------------------
    //resizing canvas
    if((xmax - xmin) >= canvas.width)
    {
        canvas.width = xmax - xmin + 3;
        if(xmin < 0) x0 -= xmin -1;
    }

    if((ymax - ymin) >= canvas.height)
    {
        canvas.height = ymax - ymin + 3;
        if(ymin < 0) y0 -= ymin -1;
    }
    
    xmin = 0;
    xmax = canvas.width-1;
    
    ymin = 0;
    ymax = canvas.height-1;
}

function rysuj_opis()
{
    ODL_X = 15;
    ODL_Y = 15;

    ctx.font = "10px Arial";

    wiersze = summary.split("\n");
    y = ODL_Y;

    for (var i = 0; i < wiersze.length; i++)
    {
        ctx.fillText(wiersze[i], ODL_X, y);
        y += ODL_Y;
    }
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
    
    tt.angle = 180 - parseFloat(document.getElementById("tf_tt_angle").value);
    tt.diameter = parseFloat(document.getElementById("tf_tt_diameter").value);
    tt.length = parseFloat(document.getElementById("tf_tt_length").value);
    
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
    
    cb_cs.distance = parseFloat(document.getElementById("tf_cs_cb_distance").value);
    cb_cs.diameter = parseFloat(document.getElementById("tf_cs_cb_diameter").value);
    
    cb_ss.distance = parseFloat(document.getElementById("tf_ss_cb_distance").value);
    cb_ss.diameter = parseFloat(document.getElementById("tf_ss_cb_diameter").value);  
}
