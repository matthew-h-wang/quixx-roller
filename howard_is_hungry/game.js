/*********************************************
 * Tululoo Game Maker v1.3.0
 *
 * Creators 
 * Zoltan Percsich
 * Vadim "YellowAfterlife" Dyachenko
 *
 * (c) SilentWorks 2011 - 2013
 * All rights reserved.
 * www.tululoo.com
 *
 * Contributors:
 * Csaba Herbut
 ********************************************/

function tu_detect_audio(_type) {
	var _au = document.createElement('audio');
	return _au.canPlayType && _au.canPlayType(_type).replace(/no/, '');
}
//
var	__path__ = window.__path__ ? window.__path__ : '',
	// system variables:
	tu_gameloop = tu_canvas = tu_context = tu_room_to_go = null, tu_canvas_id = 'tululoocanvas',
	tu_canvas_css = 'background: rgb(42, 42, 42); border: 0;',
	tu_loading = tu_load_total = 0,
	var_override_ = (Object.defineProperty != undefined),
	// resources:
	tu_sprites = [], tu_audios = [], tu_backgrounds = [], tu_fonts = [], tu_scenes = [],
	// time:
	tu_frame_time = tu_frame_step = tu_frame_el = tu_frame_count = tu_elapsed = 0,
	tu_prev_cycle_time = tu_prev_frame_time = (new Date()).getTime(),
	// math:
	max = Math.max, min = Math.min, round = Math.round, floor = Math.floor, ceil = Math.ceil,
	sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt, tan = Math.tan, rand = Math.random,
	arccos = Math.acos, arcsin = Math.asin, arctan = Math.atan, arctan2 = Math.atan2,
	tu_r2d = -180 / Math.PI, tu_d2r = Math.PI / -180, tu_2pi = Math.PI * 2,
	// i/o variables:
	mouse_x = mouse_y = 0, mouse_down = mouse_pressed = mouse_released = false,
	key_down = [], key_pressed = [], key_released = [], tu_vkeys = [],
	tu_keys_pressed = [], tu_keys_released = [],
	touch_x = [], touch_y = [], touch_count = 0,
	tu_unpausekey = 27, tu_paused = false, tu_modal = null, tu_modaldraw = true,
	// i/o constants:
	vk_0 = 48, vk_1 = 49, vk_2 = 50, vk_3 = 51, vk_4 = 52, vk_5 = 53, vk_6 = 54,
	vk_7 = 55, vk_8 = 56, vk_9 = 57, vk_a = 65, vk_add = 107, vk_alt = 18, vk_b = 66,
	vk_backspace = 8, vk_c = 67, vk_ctrl = 17, vk_d = 68, vk_decimal = 110, vk_delete = 46,
	vk_divide = 111, vk_down = 40, vk_e = 69, vk_end = 35, vk_enter = 13, vk_escape = 27,
	vk_f1 = 112, vk_f2 = 113, vk_f3 = 114, vk_f4 = 115, vk_f5 = 116, vk_f6 = 117,
	vk_f7 = 118, vk_f8 = 119, vk_f9 = 120, vk_f10 = 121, vk_f11 = 122, vk_f12 = 123,
	vk_g = 71, vk_h = 72, vk_home = 36, vk_f = 70, vk_i = 73, vk_insert = 45, vk_j = 74, vk_k = 75,
	vk_l = 76, vk_left = 37, vk_m = 77, vk_multiply = 106, vk_n = 78, vk_num0 = 96, vk_num1 = 97,
	vk_num2 = 98, vk_num3 = 99, vk_num4 = 100, vk_num5 = 101, vk_num6 = 102, vk_num7 = 103,
	vk_num8 = 104, vk_num9 = 105, vk_o = 79, vk_p = 80, vk_pagedown = 34, vk_pageup = 33,
	vk_pause = 19, vk_q = 81, vk_r = 82, vk_right = 39, vk_s = 83, vk_shift = 16, vk_space = 32,
	vk_subtract = 109, vk_t = 84, vk_tab = 9, vk_u = 85, vk_up = 38, vk_v = 86, vk_w = 87,
	vk_x = 88, vk_y = 89, vk_z = 90,
	// collisions:
	ct_null = 0, ct_point = 1, ct_box = 2, ct_circle = 3,
	// tiles:
	tu_tiles = [], tu_tilesi = [], tu_tilez = 256,
	// sound variables:
	tu_wav_supported = tu_detect_audio('audio/wav; codecs="1"'),
	tu_ogg_supported = tu_detect_audio('audio/ogg; codecs="vorbis"'),
	tu_mp3_supported = tu_detect_audio('audio/mpeg;'),
	// drawing:
	tu_draw_alpha = 1, tu_draw_color_red = tu_draw_color_green = tu_draw_color_blue = 0,
	tu_draw_font = "Arial 12px", tu_draw_halign = "left", tu_draw_valign = "top",
	tu_draw_font_ = { size: 12, family: 'Arial', bold: false, italic: false },
	tu_draw_color = "rgb(" + tu_draw_color_red + "," + 
	tu_draw_color_green + "," + tu_draw_color_blue + ")", 
	tu_redraw, tu_redraw_auto = true,
	tu_viewport_inst = null,
	// drawing constants:
	fa_left = "left", fa_center = "center", fa_right = "right",
	fa_top = "top", fa_middle = "middle", fa_bottom = "bottom",
	// system room variables:
	tu_depth = [], tu_depthi = [], tu_depthu = [], tu_types = [], tu_persist = [],
	// public room variables:
	room_current = null,
	room_speed = 30, fps = room_speed,
	room_background = null,
	room_width = 0, room_height = 0,
	room_background_color_show = true, room_background_color_red = 0, 
	room_background_color_green = 0, room_background_color_blue = 0,
	room_viewport_width = 0, room_viewport_height = 0,
	room_viewport_object = null,
	room_viewport_hborder = 0, room_viewport_vborder = 0,
	room_viewport_x = 0, room_viewport_y = 0,
	global = null;
// keyboard functions:
function keyboard_check(_key) { return key_down[_key]; }
function keyboard_check_pressed(_key) { return key_pressed[_key]; }
function keyboard_check_released(_key) { return key_released[_key]; }
// mouse functions:
function mouse_check() { return mouse_down; }
function mouse_check_pressed() { return mouse_pressed; }
function mouse_check_released() { return mouse_released; }
// virtual keys:
function vkey() {
	this.top = 0;
	this.left = 0;
	this.right = 0;
	this.bottom = 0;
	this.key = 0;
	this.down = false;
	this.active = true;
}
function vkey_add(_x, _y, _w, _h, _k) {
	var _v = new vkey();
	_v.left = _x;
	_v.top = _y;
	_v.right = _x + _w;
	_v.bottom = _y + _h;
	_v.width = _w;
	_v.height = _h;
	_v.key = _k;
	tu_vkeys.push(_v);
	return _v;
}
// misc:
function trace() { console.log.apply(console, arguments); }
function tu_idle() { } // left empty on purpose
// minimal math:
function abs(_value) { return _value < 0 ? -_value : _value; }
function sign(_value) { return _value > 0 ? 1 : _value < 0 ? -1 : 0; }
function choose() { return arguments[~~(Math.random() * arguments.length)]; }
function random(_value) { return Math.random() * _value; }
function irandom(_value) { return ~~(Math.random() * _value + 1); }
// trig functions:
function lengthdir_x(_length, _direction) { return _length * Math.cos(_direction * tu_d2r); }
function lengthdir_y(_length, _direction) { return _length * Math.sin(_direction * tu_d2r); }
function point_distance(_x1, _y1, _x2, _y2) { return Math.sqrt(Math.pow(( _x1 - _x2), 2) + Math.pow((_y1 - _y2), 2)); }
function point_direction(_x1, _y1, _x2, _y2) { return Math.atan2(_y2 - _y1, _x2 - _x1) * tu_r2d; }
function degtorad(_degree) { return _degree * tu_d2r; }
function radtodeg(_degree) { return _degree * tu_r2d; }
// sound functions:
function sound_mode(_sound, _mode) {
	if (_sound.audio.networkState == _sound.audio.NETWORK_NO_SOURCE) return;
	switch (_sound.type) {
	case "wav": if (!tu_wav_supported) return; break;
	case "ogg": if (!tu_ogg_supported) return; break;
	case "mp3": if (!tu_mp3_supported) return; break;
	}
	if (_mode != 3) {
		_sound.audio.pause();
		if (_mode != 0) {
			_sound.audio.currentTime = 0;
		} else return;
		_sound.audio.loop = _mode > 1;
	}
	_sound.audio.play();
}
function sound_play(_sound) { sound_mode(_sound, 1); }
function sound_loop(_sound) { sound_mode(_sound, 2); }
function sound_resume(_sound) { sound_mode(_sound, 3); }
function sound_stop(_sound) { sound_mode(_sound, 0); }
function sound_stop_all() { for ( var _s = 0; _s < tu_audios.length; _s++) sound_stop( tu_audios[_s] ); }
function sound_volume( _sound, _volume) {
	if (_sound.audio.networkState == _sound.audio.NETWORK_NO_SOURCE) return;
	_sound.audio.volume = _volume;
}
// draw sprite:
function draw_sprite(_sprite_index, _sub_image, _x, _y) {
	if (_sprite_index == null) return;
	if (_sub_image > _sprite_index.frames.length - 1) _sub_image = 0;
	tu_context.save();
	tu_context.translate(_x - room_viewport_x, _y - room_viewport_y);
	tu_context.globalAlpha = tu_draw_alpha;
	tu_context.drawImage(_sprite_index.frames[~~_sub_image], -_sprite_index.xoffset, -_sprite_index.yoffset);
	tu_context.restore();
}
function draw_sprite_part(_sprite_index, _sub_image, _left, _top, _width, _height, _x, _y) {
	if (_sprite_index == null) return;
	if (_sub_image >= _sprite_index.frames.length) _sub_image = _sub_image % _sprite_index.frames.length;
	tu_context.save();
	tu_context.translate(_x - room_viewport_x, _y - room_viewport_y);
	tu_context.globalAlpha = tu_draw_alpha;
	tu_context.drawImage(_sprite_index.frames[~~_sub_image], _left, _top, _width, _height, 0, 0, _width, _height);
	tu_context.restore();
}
function draw_sprite_ext(_sprite_index, _sub_image, _x, _y, _xscale, _yscale, _rotation, _alpha) {
	if (_sprite_index == null) return;
	if (_sub_image >= _sprite_index.frames.length) _sub_image = _sub_image % _sprite_index.frames.length;
	tu_context.save();
	tu_context.translate(_x - room_viewport_x, _y - room_viewport_y);
	tu_context.rotate(degtorad(_rotation));
	tu_context.scale(_xscale, _yscale);
	tu_context.globalAlpha = _alpha;
	tu_context.drawImage(_sprite_index.frames[~~_sub_image], -_sprite_index.xoffset , -_sprite_index.yoffset, _sprite_index.width, _sprite_index.height);
	tu_context.restore();
}
// draw text:
function draw_text(_x, _y, _text) {
	tu_context.font = tu_draw_font;
	tu_context.textAlign = tu_draw_halign;
	tu_context.textBaseline = tu_draw_valign;
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.fillText( _text, _x - room_viewport_x, _y - room_viewport_y );
}
// draw shapes:
function draw_rectangle(_x1, _y1, _x2, _y2, _outline) {
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.beginPath();
	if (_outline) tu_context.strokeRect( _x1- room_viewport_x, _y1 - room_viewport_y, _x2 - _x1, _y2 - _y1 );
	else tu_context.fillRect( _x1- room_viewport_x, _y1 - room_viewport_y, _x2 - _x1, _y2 - _y1 );
	tu_context.closePath();
}
function draw_circle(_x, _y, _r, _outline) {
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.beginPath();
	tu_context.arc( _x - room_viewport_x, _y - room_viewport_y, _r, 0, tu_2pi, true );
	tu_context.closePath();
	!_outline ? tu_context.fill() : tu_context.stroke();
}

function draw_line(_x1, _y1, _x2, _y2) {
	tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.beginPath();
	tu_context.moveTo( _x1 - room_viewport_x, _y1 - room_viewport_y );
	tu_context.lineTo( _x2 - room_viewport_x, _y2 - room_viewport_y );
	tu_context.closePath();
	tu_context.stroke();	
}
// draw settings:
function draw_set_alpha(_alpha) {
	tu_draw_alpha = _alpha;
}
function draw_set_color( _r, _g, _b) {
	tu_draw_color_red = _r;
	tu_draw_color_green = _g;
	tu_draw_color_blue = _b;
	tu_draw_color = tu_draw_color_red + "," + tu_draw_color_green + "," + tu_draw_color_blue;
	tu_context.fillStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.strokeStyle = "rgb(" + tu_draw_color + ")";
}
function draw_set_linewidth(_width) { tu_context.lineWidth = _width; }
// draw settings - font:
function draw_set_font (_font) {
	tu_draw_font_ = _font;
	tu_draw_font = (_font.bold == 1 ? "bold" : "") + " " + (_font.italic == 1 ? "italic" : "") + " " + _font.size + "px " + _font.family;
	tu_context.font = tu_draw_font;
	tu_context.textAlign = tu_draw_halign;
	tu_context.textBaseline = tu_draw_valign;
}
function draw_set_halign(_halign) { tu_draw_halign = _halign; }
function draw_set_valign(_valign) { tu_draw_valign = _valign; }
// room translations:
function room_goto(_scene) {
	tu_viewport_inst = null;
	tu_room_to_go = _scene;
}
function room_goto_next() {
	var _ri = 0, _r;
	for (_r = 0; _r < tu_scenes.length; _r++) if (tu_scenes[_r] == room_current) _ri = _r;
	if (typeof tu_scenes[(_ri + 1)] == "object") room_goto(tu_scenes[_ri + 1]);
}
function room_goto_previous() {
	var _ri = 0, _r;
	for (_r = 0; _r < tu_scenes.length; _r++) if (tu_scenes[_r] == room_current) _ri = _r;
	if (typeof tu_scenes[(_ri - 1)] == "object") room_goto(tu_scenes[_ri - 1]);
}
function room_goto_first() { room_goto(tu_scenes[0]); }
function room_goto_last() { room_goto(tu_scenes[(tu_scenes.length - 1)]); }
function room_restart() { room_goto(room_current); }
// instance functions:
function instance_create_(_x, _y, _object) {
	var o = new _object.constructor;
	o.parameters = arguments.length > 3 ? Array.prototype.slice.call(arguments, 3) : [];
	o.object_index = _object;
	o.__instance = true;
	o.xstart = o.x = _x;
	o.ystart = o.y = _y;
	o._depth = o.depthstart;
	instance_activate(o);
	return o;
}
function instance_create(_x, _y, _object) {
	var o = instance_create_.apply(this, arguments);
	o.on_creation();
	return o;
}
function instance_number(_object) {
	return instance_list(_object).length;
}
function instance_first(_object) {
	var l = instance_list(_object);
	return l.length ? l[0] : null;
}
// BBox <> BBox
function collide_bbox_bbox(l1, t1, r1, b1, l2, t2, r2, b2) {
	return !(b1 <= t2 || t1 >= b2 || r1 <= l2 || l1 >= r2);
}
// BBox <> SpriteBox
// (left, top, right, bottom, instX, instY, scaleX, scaleY, sprite, ofsX, ofsY)
function collide_bbox_sbox(l1, t1, r1, b1, x2, y2, h2, v2, s2) {
	return
	!( b1 <= y2 + v2 * (s2.collision_top - s2.yoffset)
	|| t1 >= y2 + v2 * (s2.collision_bottom - s2.yoffset)
	|| r1 <= x2 + h2 * (s2.collision_left - s2.xoffset)
	|| l1 <= x2 + h2 * (s2.collision_right - s2.xoffset));
}
// SpriteBox <> BBox
function collide_sbox_point(x2, y2, h2, v2, s2, x1, y1) {
	return
	!( y1 <= y2 + v2 * (s2.collision_top - s2.yoffset)
	|| y1 >= y2 + v2 * (s2.collision_bottom - s2.yoffset)
	|| x1 <= x2 + h2 * (s2.collision_left - s2.xoffset)
	|| x1 <= x2 + h2 * (s2.collision_right - s2.xoffset));
}
// SpriteBox <> Circle
function collide_sbox_circle(x2, y2, h2, v2, s2, x1, y1, r1) {
	var u, v, dx, dy;
	u = x2 + h2 * (s2.collision_left - s2.xoffset);
	v = x2 + h2 * (s2.collision_right - s2.xoffset);
	dx = (x2 < u ? u : x2 > v ? v : x2) - x2;
	u = y2 + v2 * (s2.collision_top - s2.yoffset);
	v = y2 + v2 * (s2.collision_bottom - s2.yoffset);
	dy = (y2 < u ? u : y2 > v ? v : y2) - y2;
	return (dx * dx + dy * dy < r1 * r1);
}
// BBox <> Point
function collide_bbox_point(l1, t1, r1, b1, x2, y2) {
	return (x2 > l1 && x2 < r1 && y2 > t1 && y2 < b1);
}
// BBox <> Circle
function collide_bbox_circle(l1, t1, r1, b1, x2, y2, r2) {
	var dx = (x2 < l1 ? l1 : x2 > r1 ? r1 : x2) - x2, 
		dy = (y2 < t1 ? t1 : y2 > b1 ? b1 : y2) - y2;
	return (dx * dx + dy * dy < r2 * r2);
}
// Circle <> Range
function collide_circle_range(dx, dy, dr) {
	return (dx * dx + dy * dy < dr * dr);
}
// Circle <> Circle
function collide_circle_circle(x1, y1, r1, x2, y2, r2) {
	return collide_circle_range(x1 - x2, y1 - y2, r1 + r2);
}
// Circle <> Point
function collide_circle_point(x1, y1, r1, x2, y2) {
	return collide_circle_range(x1 - x2, y1 - y2, r1);
}
// instance collision checking:
function instance_position(_px, _py, _object, _mult) {
	var _x, _y, _ox, _oy, _sx, _sy, _o, _s, _i, _il, _r, _dx, _dy,
		_q = (_object.__instance ? [_object] : instance_list(_object)),
		_tm = (_mult) ? true : false;
	if (_tm) _ta = [];
	_il = _q.length;
	for (_i = 0; _i < _il; _i++) {
		_o = _q[_i];
		if (!_o.collision_checking) continue;
		_s = _o.sprite_index;
		if (!_s) continue;
		_x = _o.x; _sx = _o.image_xscale;
		_y = _o.y; _sy = _o.image_yscale;
		switch (_s.collision_shape)
		{
		case 0x2:
			if (_sx == 1 && _sy == 1) {
				_ox = _s.xoffset; _oy = _s.yoffset;
				if (!collide_bbox_point(_x + _s.collision_left - _ox, _y + _s.collision_top - _oy,
				_x + _s.collision_right - _ox, _y + _s.collision_bottom - _oy, _px, _py)) break;
			} else if (!collide_sbox_point(_x, _y, _sx, _sy, _s)) break;
			if (!_tm) return _o;
			_ta.push(_o);
			break;
		case 0x3:
			_r = _s.collision_radius * Math.max(_o.image_xscale, _o.image_yscale);
			_dx = _o.x + (_s.width / 2 - _s.xoffset) - _px;
			_dy = _o.y + (_s.height / 2 - _s.yoffset) - _py;
			if ((_dx * _dx) + (_dy * _dy) > _r * _r) break;
			if (!_tm) return _o;
			_ta.push(_o);
			break;
		}
	}
	return _tm ? _ta : null;
}
//
function __place_meeting__(nx, ny, what, many) {
	this.other = null;
	var i, l,
		// sprite, scale:
		ts = this.sprite_index,
		tsx, tsy, tfx, tfy, tst,
		// circle:
		tcx, tcy, tcr,
		// bbox:
		tbl, tbr, tbt, tbb,
		// instances, multiple, output, types:
		tz, tm, ct, ch, ra,
		// other:
		o, ox, oy, os, ost, osx, osy, ofx, ofy, ofr;
	if (ts == null) return false;
	tfx = ts.xoffset;
	tfy = ts.yoffset;
	tsx = this.image_xscale;
	tsy = this.image_yscale;
	tst = ts.collision_shape;
	// bbox:
	if (tst == 2) {
		tbl = nx + tsx * (ts.collision_left - tfx);
		tbr = nx + tsx * (ts.collision_right - tfx);
		tbt = ny + tsy * (ts.collision_top - tfy);
		tbb = ny + tsy * (ts.collision_bottom - tfy);
	}
	// circle:
	if (tst == 3) {
		tcr = ts.collision_radius * (tsx > tsy ? tsx : tsy);
		tcx = nx + tsx * (ts.width / 2 - tfx);
		tcy = ny + tsy * (ts.height / 2 - tfy);
	}
	//
	tz = (what.__instance ? [what] : instance_list(what));
	tm = many ? true : false;
	if (tm) ra = [];
	l = tz.length;
	for (i = 0; i < l; i++) {
		o = tz[i];
		if (!o.collision_checking) continue;
		os = o.sprite_index;
		if (os == null) continue;
		ox = o.x; osx = o.image_xscale;
		oy = o.y; osy = o.image_yscale;
		ost = os.collision_shape;
		ct = (tst << 4) | ost;
		ch = false;
		switch(ct) {
		case 0x22:
			if (osx == 1 && osy == 1) {
				ofx = os.xoffset; ofy = os.yoffset;
				if (!collide_bbox_bbox(tbl, tbt, tbr, tbb,
				ox + os.collision_left - ofx, oy + os.collision_top - ofy,
				ox + os.collision_right - ofx, oy + os.collision_bottom - ofy)) break;
			} else if (!collide_bbox_sbox(tbl, tbt, tbr, tbb, ox, oy, osx, osy, os)) break;
			ch = true;
			break;
		case 0x23:
			ofr = os.collision_radius * (osx > osy ? osx : osy);
			ofx = ox + osx * (os.width / 2 - os.xoffset);
			ofy = oy + osy * (os.height / 2 - os.yoffset);
			if (!collide_bbox_circle(tbl, tbt, tbr, tbb, ofx, ofy, ofr)) break;
			ch = true;
			break;
		case 0x32:
			if (osx == 1 && osy == 1) {
				ofx = os.xoffset; ofy = os.yoffset;
				if (!collide_bbox_circle(
				ox + os.collision_left - ofx, oy + os.collision_top - ofy,
				ox + os.collision_right - ofx, oy + os.collision_bottom - ofy,
				tcx, tcy, tcr)) break;
			} else if (!collide_sbox_circle(ox, oy, osx, osy, os, tcx, tcy, tcr)) break;
			ch = true;
			break;
		case 0x33:
			ofr = os.collision_radius * (osx > osy ? osx : osy);
			ofx = ox + osx * (os.width / 2 - os.xoffset);
			ofy = oy + osy * (os.height / 2 - os.yoffset);
			if (!collide_circle_circle(tcx, tcy, tcr, ofx, ofy, ofr)) break;
			ch = true;
			break;
		} if (!ch) continue;
		this.other = o;
		o.other = this;
		if (!tm) return (o);
		ra.push(o);
	} return ra;
}
function position_meeting(_x, _y, _object) {
	return instance_position(_x, _y, _object) != null;
}
function __move_towards_point__(_x, _y, _speed) {
	if (_speed == 0) return;
	if (this.x == _x && this.y == _y) return;
	var _dx = _x - this.x,
		_dy = _y - this.y,
		_dist = _dx * _dx + _dy * _dy;
	if (_dist < _speed * _speed) {
		this.x = _x;
		this.y = _y;
	} else {
		_dist = Math.sqrt(_dist);
		this.x += _dx * _speed / _dist;
		this.y += _dy * _speed / _dist;
	}
}

function __instance_destroy__() {
	tu_trash.push( this );
}
// web data:
function save_web_data(_name, _value) { if (window.localStorage) window.localStorage.setItem(_name, _value); }
function save_web_integer(_name, _value) { if (window.localStorage) window.localStorage.setItem("int_" + _name, _value); }
function save_web_float(_name, _value) { if (window.localStorage) window.localStorage.setItem("float_" + _name, _value); }
function save_web_string(_name, _value) { if (window.localStorage) window.localStorage.setItem("string_" + _name, _value); }
function load_web_data(_name) { if (window.localStorage) return window.localStorage.getItem(_name); }
function load_web_integer(_name) { if (window.localStorage) return parseInt(window.localStorage.getItem("int_" + _name)); }
function load_web_float(_name) { if (window.localStorage) return parseFloat(window.localStorage.getItem("float_" + _name)); }
function load_web_string(_name) { if (window.localStorage) return '' + window.localStorage.getItem("string_" + _name); }
function delete_web_data(_name) { if (window.localStorage) window.localStorage.removeItem(_name); }
function delete_web_integer(_name) { if (window.localStorage) window.localStorage.removeItem("int_" + _name); }
function delete_web_float(_name) { if (window.localStorage) window.localStorage.removeItem("float_" + _name); }
function delete_web_string(_name) { if (window.localStorage) window.localStorage.removeItem("string_" + _name); }
function clear_web_data() { if (window.localStorage) window.localStorage.clear(); }
function web_data_number() { if (window.localStorage) return window.localStorage.length; }
// misc functions:
function pause_game( _key) {
	tu_paused = true;
	tu_unpausekey = _key;
}
function modal_end() {
	if (tu_modal == null) return;
	tu_modal.instance_destroy();
	tu_modal = null;
}
function modal_start(_inst, _draw) {
	if (tu_modal != null) modal_end();
	tu_modal = _inst;
	tu_modaldraw = _draw;
}
//
function show_mouse() { tu_canvas.style.cursor = "default"; }
function hide_mouse() { tu_canvas.style.cursor = "none"; }
//
function tu_gettime() { return (new Date()).getTime(); }

/***********************************************************************
 * ENGINE
 ***********************************************************************/
 
function tu_global () { }
global = new tu_global();
//{ Events
function __keydownlistener__(e) {
	var r = true;
	if (!e) e = window.event;
	if (document.activeElement && document.activeElement == tu_canvas || document.activeElement == document.body) r = false;
	if (e.repeat) return;
	var keyCode = window.event ? e.which : e.keyCode;
	if (!key_down[keyCode]) {
		key_pressed[keyCode] = true;
		tu_keys_pressed.push(keyCode);
	}
	key_down[keyCode] = true;
	if (!r) e.preventDefault();
	return r;
};
function __keyuplistener__(e) {
	var r = true;
	if (!e) e = window.event;
	if (document.activeElement && document.activeElement == tu_canvas || document.activeElement == document.body) r = false;
	var keyCode = window.event ? e.which : e.keyCode;
	if (key_down[keyCode])
	{
		key_released[keyCode] = true;
		tu_keys_released.push(keyCode);
	}
	key_down[keyCode] = false;
	if (!r) e.preventDefault();
	return r;
};
function __touchsim__(_x, _y) {
	var r = [{}];
	r[0].pageX = tu_canvas.offsetLeft + _x;
	r[0].pageY = tu_canvas.offsetTop + _y;
	__touchvkey__(r);
}
function __mousemovelistener__(_e) {
	if (_e.pageX != undefined && _e.pageY != undefined) {
		mouse_x = _e.pageX;
		mouse_y = _e.pageY;
	} else {
		mouse_x = _e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		mouse_y = _e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	if (room_current != null) {
		mouse_x -= tu_canvas.offsetLeft;
		mouse_y -= tu_canvas.offsetTop;			
	}
	if (mouse_down) __touchsim__(mouse_x, mouse_y);
};
function __mousedownlistener__(_e) {
	//if (!mouse_down) mouse_pressed = true;
	//mouse_down = true;
	__touchsim__(mouse_x, mouse_y);
};
function __mouseuplistener__(_e) {
	//if (mouse_down) mouse_released = true;
	//mouse_down = false;
	__touchvkey__([]);
};
function __touchvkey__(_t) {
	var _tx = 0, _ty = 0, _tc = 0, _tl = _t.length, _vl = tu_vkeys.length, _i, _j, _c, _k,
		_dx = tu_canvas.offsetLeft, _dy = tu_canvas.offsetTop, _mx = _my = 1;
	if (tu_canvas.style.width) _mx 
	touch_x = []; touch_y = []; touch_count = 0;
	for (_i = 0; _i < _vl; _i++) tu_vkeys[_i].count = 0;
	for (_i = 0; _i < _tl; _i++) {
		_c = 0;
		for (_j = 0; _j < _vl; _j++) {
			if (!tu_vkeys[_j].active) continue;
			if (_t[_i].pageX - _dx > tu_vkeys[_j].right) continue;
			if (_t[_i].pageX - _dx < tu_vkeys[_j].left) continue;
			if (_t[_i].pageY - _dy < tu_vkeys[_j].top) continue;
			if (_t[_i].pageY - _dy > tu_vkeys[_j].bottom) continue;
			tu_vkeys[_j].count++;
			if (!tu_vkeys[_j].down) {
				tu_vkeys[_j].down = true;
				_k = tu_vkeys[_j].key;
				if (!key_down[_k]) {
					key_down[_k] = true;
					key_pressed[_k] = true;
					tu_keys_pressed.push(_k);
				}
			}
			_c++;
		}
		if (_c == 0) {
			_tx += _t[_i].pageX;
			_ty += _t[_i].pageY;
			touch_x[_tc] = _t[_i].pageX - _dx;
			touch_y[_tc] = _t[_i].pageY - _dy;
			_tc++;
		}
	}
	for (_i = 0; _i < _vl; _i++) {
		if (tu_vkeys[_i].count != 0) continue;
		if (!tu_vkeys[_i].down) continue;
		tu_vkeys[_i].down = false;
		_k = tu_vkeys[_i].key;
		if (key_down[_k]) {
			key_down[_k] = false;
			key_released[_k] = true;
			tu_keys_released.push(_k);
		}
	}
	touch_count = _tc;
	if (_tc != 0) {
		mouse_x = (_tx / _tc) - _dx;
		mouse_y = (_ty / _tc) - _dy;
		if (!mouse_down) {
			mouse_down = true;
			mouse_pressed = true;
		}
	} else if (mouse_down) {
		mouse_down = false;
		mouse_released = true;
	}
};
function __touchlistener__(e) {
	e.preventDefault();
	__touchvkey__(e.targetTouches);
};
//}
function tu_init () {
	if (document.addEventListener) {
		document.addEventListener("keydown", __keydownlistener__, false);
		document.addEventListener("keyup", __keyuplistener__, false);
		document.addEventListener("mousemove", __mousemovelistener__, false);
		document.addEventListener("mousedown", __mousedownlistener__, false);
		document.addEventListener("mouseup", __mouseuplistener__, false);
		document.addEventListener("touchstart", __touchlistener__, false);
		document.addEventListener("touchend", __touchlistener__, false);
		document.addEventListener("touchmove", __touchlistener__, false);
		document.addEventListener("touchenter", __touchlistener__, false);
		document.addEventListener("touchleave", __touchlistener__, false);
		document.addEventListener("touchcancel", __touchlistener__, false);
	} else {
		document.attachEvent("onkeydown", __keydownlistener__);
		document.attachEvent("onkeyup", __keyuplistener__);
		document.attachEvent("onmousemove", __mousemovelistener__);
		document.attachEvent("onmousedown", __mousedownlistener__);
		document.attachEvent("onmouseup", __mouseuplistener__);
	}
	// initialize keycodes
	for (var _k = 0; _k < 256; _k++) {
		key_down[_k] = key_pressed[_k] = key_released[_k] = false;
	}
}

function tu_loading_inc() { tu_loading++; tu_load_total++; }
function tu_loading_dec() { tu_loading--; }

function _$_(_id_) {
	return document.getElementById( _id_ );
}

function var_override(_what, _svar, _fget, _fset) {
	if (var_override_) {
		if (_what.hasOwnProperty(_svar)) return;
		Object.defineProperty(_what, _svar, {
			get: _fget,
			set: _fset
		});
	} else {
		if (_what.__lookupGetter__(_svar) != undefined) return;
		_what.__defineGetter__(_svar, _fget);
		_what.__defineSetter__(_svar, _fset);
	}
}

//{ Depth
function _tu_depth_find(_d) {
	var _tl = tu_depthi.length, _td, _ti;
	for (_ti = 0; _ti < _tl; _ti++) {
		_td = tu_depthi[_ti];
		if (_d > _td) return _ti;
	}
	return _tl;
}
function _tu_depth_new(_d) {
	var _i = _tu_depth_find(_d), _o = [];
	tu_depth.splice(_i, 0, _o);
	tu_depthi.splice(_i, 0, _d);
	return _i;
}
function tu_depth_add(_d, _o) {
	var _t = tu_depthi.indexOf(_d);
	if (_t == -1) _t = _tu_depth_new(_d); // create array if none
	tu_depth[_t].push(_o);
}
function tu_depth_delete(_d, _o) {
	var _t = tu_depth[tu_depthi.indexOf(_d)], _ti = _t.indexOf(_o);
	if (_ti == -1) return;
	_t.splice(_ti, 1);
}
function tu_depth_update() {
	var i, l = tu_depthu.length, o;
	if (l == 0) return;
	for (i = 0; i < l; i++) {
		o = tu_depthu[i];
		if (o.instance_active && o._depth !== undefined) tu_depth_delete(o._depth, o);
		o._depth = o._depthn;
		if (o.instance_active && o._depth !== undefined) tu_depth_add(o._depth, o);
		o._depthu = false;
	}
	tu_depthu = [];
}
// Accessors:
function tu_depth_get() { return this._depth; }
function tu_depth_set(_d) {
	if (this._depth == _d) return; // don't change on depth match
	this._depthn = _d;
	if (this._depthu) return;
	this._depthu = true;
	tu_depthu.push(this);
}
//}
//{ Types
function instance_list(_o) {
	var _t = _o._object_index_;
	if (tu_types[_t] == undefined) tu_types[_t] = [];
	return tu_types[_t];
}
function tu_type_add(_d, _o) {
	instance_list(_d).push(_o);
}
function tu_type_delete(_o, _p) {
	var _d = tu_types[_p], _t = _d.indexOf(_o);
	_d.splice(_t, 1);
}
function tu_type_get() { return this._object_index; }
//}
//{ Tileset functions
function tile_layer_find(_d) {
	var _tl = tu_tilesi.length, _td, _ti;
	for (_ti = 0; _ti < _tl; _ti++) {
		_td = tu_tilesi[_ti];
		if (_d > _td) return _ti;
	}
	return _tl;
}
function tile_layer_add(_d) {
	var _i = tile_layer_find(_d), _o = [];
	tu_tiles.splice(_i, 0, _o);
	tu_tilesi.splice(_i, 0, _d);
	return _o;
}
function tile(_s, _x, _y, _l, _t, _w, _h) {
	this.source = _s;
	this.x = _x;
	this.y = _y;
	this.left = _l;
	this.top = _t;
	this.width = _w;
	this.height = _h;
	this.width2 = _w;
	this.height2 = _h;
	this.sectors = [];
}
function tile_add(_b, _l, _t, _w, _h, _x, _y, _z) {
	var	_tx1 = Math.floor(_x / tu_tilez),
		_ty1 = Math.floor(_y / tu_tilez),
		_tx2 = Math.floor((_x + _w) / tu_tilez),
		_ty2 = Math.floor((_y + _h) / tu_tilez),
		_tt = new tile(_b, _x, _y, _l, _t, _w, _h),
		_tx, _ty, _ts,
		_d, _e = tu_tilesi.indexOf(_z);
	if (_e != -1) _d = tu_tiles[_e];
	else _d = tile_layer_add(_z);
	for (_tx = _tx1; _tx <= _tx2; _tx++) {
		if (_d[_tx] == null) _d[_tx] = [];
		for (_ty = _ty1; _ty <= _ty2; _ty++) {
			if (_d[_tx][_ty] == null) _d[_tx][_ty] = [];
			_ts = _d[_tx][_ty];
			_ts.push(_tt);
			_tt.sectors.push(_ts);
		}
	}
	return _tt;
}
function tile_find(_x, _y, _w, _h, _d) {
	var _xw = _x + _w,
		_yh = _y + _h,
		_r = [],
		_tx, _ty, _ti, _tl, _ts, _tt, _ta,
		_tx1, _ty1, _tx2, _ty2;
	_ti = tu_tilesi.indexOf(_d);
	if (_ti == -1) return _r;
	_ta = tu_tiles[_ti];
	_tx1 = Math.floor(_x / tu_tilez);
	_ty1 = Math.floor(_y / tu_tilez);
	_tx2 = Math.floor((_x + _w) / tu_tilez);
	_ty2 = Math.floor((_y + _h) / tu_tilez);
	for (_tx = _tx1; _tx <= _tx2; _tx++) {
		if (_ta[_tx] == null) continue;
		for (_ty = _ty1; _ty <= _ty2; _ty++) {
			if (_ta[_tx][_ty] == null) continue;
			_ts = _ta[_tx][_ty];
			_tl = _ts.length;
			for (_ti = 0; _ti < _tl; _ti++) {
				_tt = _ts[_ti];
				if (_tt.x >= _xw) continue;
				if (_tt.y >= _yh) continue;
				if (_tt.x + _tt.width2 < _x) continue;
				if (_tt.y + _tt.height2 < _y) continue;
				_r.push(_tt);
			}
		}
	}
	return _r;
}
function tile_delete(_t) {
	var _ti, _tl, _ts;
	_tl = _t.sectors.length;
	for (_ti = 0; _ti < _tl; _ti++) {
		_ts = _t.sectors[_ti];
		_ts.splice(_ts.indexOf(_t), 1);
	}
}
function tile_srender(_s) {
	var _ti, _tt;
	for (_ti = 0; _ti < _s.length; _ti++) {
		if (_s[_ti] == null) continue;
		_tt = _s[_ti];
		if (_tt.source == null) continue;
		if (_tt.source.image == null) continue;
		tu_context.drawImage(_tt.source.image, _tt.left, _tt.top, _tt.width, _tt.height, _tt.x - room_viewport_x, _tt.y - room_viewport_y, _tt.width2, _tt.height2);
	}
}
function tile_lrender(_l) {
	var _tx, _ty,
		_tx1 = Math.floor(room_viewport_x / tu_tilez),
		_tx2 = Math.floor((room_viewport_x + room_viewport_width) / tu_tilez),
		_ty1 = Math.floor(room_viewport_y / tu_tilez),
		_ty2 = Math.floor((room_viewport_y + room_viewport_height) / tu_tilez);
	for (_tx = _tx1; _tx <= _tx2; _tx++) {
		if (_l[_tx] == null) continue;
		for (_ty = _ty1; _ty <= _ty2; _ty++) {
			if (_l[_tx][_ty] == null) continue;
			tile_srender(_l[_tx][_ty]);
		}
	}
}
//} /Tileset functions
//{ Some events & accessors
function tu_id_get() { return this; }
function tu_parent_get() { return this._parent_index; }
function image_single_get() { return (this.image_speed == 0 ? this.image_index : -1); }
function image_single_set(_o) { this.image_speed = 0; this.image_index = _o; }
// Handles object size & sprite updates. Should get rid of this in favor of accessors.
function __handle_sprite__(_object_) {
	if (_object_.sprite_index == null) return;
	_object_.sprite_width = _object_.sprite_index.width;
	_object_.sprite_height = _object_.sprite_index.height;
	_object_.sprite_xoffset = _object_.sprite_index.xoffset;
	_object_.sprite_yoffset = _object_.sprite_index.yoffset;
	_object_.image_number = _object_.sprite_index.frames.length;
	_object_.image_index += _object_.image_speed;
	if (_object_.image_index >= _object_.image_number) _object_.image_index = _object_.image_index % _object_.image_number;
	if (_object_.image_index < 0) _object_.image_index = _object_.image_number - 1 + (_object_.image_index % _object_.image_number);
}
function __draw_self__() {
	draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
//}
//{ Inherited event lookup functions.
// There's also a way to do this with much shorter code.
function on_creation_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_creation !== on_creation_i)
	return o.on_creation.apply(this);
}
function on_destroy_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_destroy !== on_destroy_i)
	return o.on_destroy.apply(this);
}
function on_step_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_step !== on_step_i)
	return o.on_step.apply(this);
}
function on_end_step_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_end_step !== on_end_step_i)
	return o.on_end_step.apply(this);
}
function on_draw_d() {
	__handle_sprite__(this);
	__draw_self__.apply(this);
}
function on_draw_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_draw !== on_draw_i)
	return o.on_draw.apply(this);
	on_draw_d.apply(this);
}
function on_collision_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_collision !== on_collision_i)
	return o.on_collision.apply(this);
}
function on_animationend_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_animationend !== on_animationend_i)
	return o.on_animationend.apply(this);
}
function on_roomstart_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_roomstart !== on_roomstart_i)
	return o.on_roomstart.apply(this);
}
function on_roomend_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_roomend !== on_roomend_i)
	return o.on_roomend.apply(this);
}
//} /Inherited event handles

// instance_init(this, object_index, parent_index, visible, depth, sprite, collideable, inner index)
// Universal object constructor:
function __instance_init__(_this, _oi, _p, _v, _d, _si, _c, _io) {
	_this._object_index = undefined;
	_this._object_index_ = _io;
	_this._depth = undefined;
	_this._depthn = undefined;
	_this._depthu = false;
	var_override(_this, 'depth', tu_depth_get, tu_depth_set );
	var_override(_this, 'object_index', tu_type_get, tu_idle );
	var_override(_this, 'image_single', image_single_get, image_single_set );
	var_override(_this, 'id', tu_id_get, tu_idle);
	var_override(_this, 'parent', tu_parent_get, tu_idle);
	_this._object_index = _oi;
	_this._parent_index = _p;
	_this.xstart = _this.xprevious = _this.x = 0;
	_this.ystart = _this.yprevious = _this.y = 0;
	_this.depthstart = _d;
	_this.image_angle = _this.direction = 0;
	_this.visible = _v;
	_this.image_yscale = _this.image_xscale = 1;
	_this.image_alpha = 1;
	_this.image_index = 0;
	_this.image_speed = 1;
	_this.sprite_index = _si;
	_this.speed = 0;
	_this.other = null;
	_this.collision_checking = _c;
	_this.persistent = false;
	_this.instance_active = false;
	// Instance-specific functions:
	_this.place_meeting = __place_meeting__;
	_this.move_towards_point = __move_towards_point__;
	_this.instance_destroy = __instance_destroy__;
	_this.draw_self = __draw_self__;
}
// Universal sprite constructor:
function __sprite_init__(_this, _name, _width, _height, _xofs, _yofs, _cshape, _crad, _cl, _cr, _ct, _cb, _frames) {
	_this.frames = [];
	var _frame, _fi;
	for (_fi = 0; _fi < _frames.length; _fi++) {
		_frame = new Image();
		if (_frames[_fi]) {
			tu_loading_inc();
			_frame.onload = tu_loading_dec;
			_frame.onerror = tu_loading_dec;
			_frame.src = _frames[_fi];
		}
		_this.frames.push(_frame);
	}
	_this.width = _width;
	_this.height = _height;
	_this.xoffset = _xofs;
	_this.yoffset = _yofs;
	_this.collision_shape = (_cshape == 'Circle' ? ct_circle : _cshape == 'Box' ? ct_box : 0);
	_this.collision_radius = _crad;
	_this.collision_left = _cl;
	_this.collision_right = _cr;
	_this.collision_top = _ct;
	_this.collision_bottom = _cb;
	tu_sprites.push(_this);
}
// Universal audio constructor:
function __audio_init__(_this, _name, _wav, _mp3, _ogg) {
	var _src = '';
	_this.type = 'none';
	if (tu_ogg_supported && (_ogg != '')) {
		_this.type = 'ogg';
		_src = _ogg;
	} else if (tu_mp3_supported && (_mp3 != '')) {
		_this.type = 'mp3';
		_src = _mp3;
	} else if (tu_wav_supported && (_wav != '')) {
		_this.type = 'wav';
		_src = _wav;
	}
	if (_src != '') {
		_this.audio = document.createElement('audio');
		_this.audio.setAttribute('src', _src);
	}
	tu_audios.push(_this);
}

function __background_init__(_this, _name, _file) {
	_this.image = new Image();
	tu_loading_inc();
	_this.image.onload = tu_loading_dec;
	_this.image.onerror = tu_loading_dec;
	_this.image.src = _file;
	tu_backgrounds.push(_this);
}

function __font_init__(_this, _name, _family, _size, _bold, _italic) {
	_this.family = _family;
	_this.size = _size;
	_this.bold = _bold;
	_this.italic = _italic;
	tu_fonts.push(_this);
}

// (this, name, width, height, speed, back. red, back. green, back. blue, background, back. tilex, back. tiley, back. stretch, view width, view height, view object, view hborder, view vborder)
function __room_start__(_this, _name, _rw, _rh, _rs, _br, _bg, _bb, _bi, _bx, _by, _bs, _vw, _vh, _vo, _vx, _vy) {
	_$_('tululoogame').innerHTML = "<canvas id='" + tu_canvas_id + "' width='" + _vw + "' height='" + _vh + "' style='" + tu_canvas_css + "'></canvas>";
	tu_canvas = _$_(tu_canvas_id);
	tu_context = tu_canvas.getContext('2d');
	room_current = _this;
	// generic:
	room_speed = _rs;
	room_width = _rw;
	room_height = _rh;
	// background color:
	room_background_color_red = _br;
	room_background_color_green = _bg;
	room_background_color_blue = _bb;
	// background image:
	room_background = _bi;
	room_background_x = 0;
	room_background_y = 0;
	room_background_tile_x = _bx;
	room_background_tile_y = _by;
	room_background_tile_stretch = _bs;
	// view:
	room_viewport_width = _vw;
	room_viewport_height = _vh;
	room_viewport_x = room_viewport_y = 0;
	room_viewport_object = _vo;
	room_viewport_hborder = _vx;
	room_viewport_vborder = _vy;
	// tiles:
	var _l, _b, _t, _i, _il, _tls_, i, l, d, o, a;
	_tls_ = _this.tiles; tu_tiles = []; tu_tilesi = [];
	for (_l = 0; _l < _tls_.length; _l++)
	for (_b = 1; _b < _tls_[_l].length; _b++)
	for (_t = 1; _t < _tls_[_l][_b].length; _t++)
	tile_add(_tls_[_l][_b][0], _tls_[_l][_b][_t][0], _tls_[_l][_b][_t][1], _tls_[_l][_b][_t][2], _tls_[_l][_b][_t][3], _tls_[_l][_b][_t][4], _tls_[_l][_b][_t][5], _tls_[_l][0]);
	// objects:
	tu_depth = []; tu_depthi = []; tu_depthu = []; tu_types = [];
	a = _this.objects;
	l = a.length;
	for (i = 0; i < l; i++) {
		d = a[i];
		d = d[0]; // temp.fix for rc2
		if (d.o === undefined) continue;
		o = instance_create_(d.x, d.y, d.o);
		if (d.s !== undefined) o.sprite_index = d.s;
		if (d.d !== undefined) o.direction = d.d;
		if (d.a !== undefined) o.image_angle = d.a;
		if (d.u !== undefined) o.image_xscale = d.u;
		if (d.v !== undefined) o.image_yscale = d.v;
		if (d.c !== undefined) d.c.apply(o);
	}
	// persistent objects:
	_l = tu_persist.length
	for (_t = 0; _t < _l; _t++) instance_activate(tu_persist[_t]);
	instance_foreach(function(o) {
		if (tu_persist.indexOf(o) != -1) return;
		o.on_creation();
	});
	tu_persist = [];
	//
	instance_foreach(function(o) {
		o.on_roomstart();
	});
}

function tu_preloader() {
	var _w = Math.min(400, (tu_canvas.width * 0.6) >> 0), _h = 16,
		_x = (tu_canvas.width - _w) >> 1, _y = (tu_canvas.height - _h) >> 1,
		_p = (tu_load_total - tu_loading) / tu_load_total,
		_s = "Loading resources: " + (tu_load_total - tu_loading) + "/" + (tu_load_total);
	tu_canvas.width = tu_canvas.width;
	tu_canvas.height = tu_canvas.height;
	tu_canvas.style.backgroundColor = "rgb(42, 42, 42)";
	tu_context.font = "italic 12px Verdana";
	tu_context.textAlign = "left";
	tu_context.textBaseline = "bottom";
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(192, 192, 192, 1)";
	tu_context.fillRect(_x - 1, _y - 1, _w + 2, _h + 2);
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(0, 0, 0, 1)";
	tu_context.fillRect(_x, _y, _w, _h);
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(255, 255, 255, 1)";
	tu_context.fillRect(_x + 2, _y + 2, (_w - 4) * _p, _h - 4);
	tu_context.fillText(_s, _x, _y - 2);
}

function tu_render_back() {
	if (room_background == null) return;
	if (room_background_tile_stretch) {
		tu_context.drawImage(room_background, 0 - room_viewport_x, 0 - room_viewport_y, room_width, room_height);
		return;
	}
	var _bw, _bh, _bx, _by, _vx, _vy, _vw, _vh, _x1, _x2, _y1, _y2, _ht, _vt;
	_bw = room_background.width;
	_bh = room_background.height;
	_bx = room_background_x;
	if (room_background_tile_x) { _bx = _bx < 0 ? _bw - _bx % _bw : _bx % _bw; }
	_by = room_background_y;
	if (room_background_tile_y) { _bx = _by < 0 ? _bh - _by % _bh : _by % _bh; }
	//
	_vx = room_viewport_x;
	_vy = room_viewport_y;
	_vw = room_viewport_width;
	_vh = room_viewport_height;
	//
	_x1 = room_background_tile_x ? Math.floor(_vx / _bw) * _bw - _bx : -_bx;
	_x2 = room_background_tile_x ? Math.floor((_vx + _vw + _bw) / _bw) * _bw : _x1 + _bw;
	_y1 = room_background_tile_y ? Math.floor(_vy / _bh) * _bh - _by : -_by;
	_y2 = room_background_tile_y ? Math.floor((_vy + _vh + _bh) / _bh) * _bh : _y1 + _bh;
	for (_ht = _x1; _ht < _x2; _ht += _bw)
	for (_vt = _y1; _vt < _y2; _vt += _bh)
	tu_context.drawImage(room_background, _ht - _vx, _vt - _vy);
}
// @1.2.6
function instance_activate(_i) {
	if (_i.instance_active) return;
	for (var o = _i._object_index; o; o = o.parent) tu_type_add(o, _i);
	//tu_type_add(_i._object_index, _i);
	//if (_i.parent != null) tu_type_add(_i.parent, _i);
	tu_depth_add(_i._depth, _i);
	_i.instance_active = true;
}
// @1.2.6
function instance_deactivate(_i) {
	if (!_i.instance_active) return;
	for (var o = _i._object_index; o; o = o.parent) tu_type_delete(o._object_index_, _i);
	//tu_type_delete(_i, _i._object_index_);
	//if (_i.parent != null) tu_type_delete(_i, _i.parent._object_index_);
	tu_depth_delete(_i._depth, _i);
	_i.instance_active = false;
}
// @1.2.6 Performs function for all instances
function instance_foreach(_function) {
	var _d, _l, _o;
	for (_d in tu_depth) {
		_l = tu_depth[_d];
		for (_o = 0; _o < _l.length; _o++) _function(_l[_o]);
	}
}
// @1.2.6 Performs function for all instances on specific depth
function instance_fordepth(_depth, _function) {
	var _o, _d = tu_depthc[_depth], _l;
	if (_d == null) return;
	_l = _d.length;
	for (_o = 0; _o < _l; _o++) _function(_d[_o]);
}
// @1.2.6 Actions performed on room switch
function tu_room_switchto_(_o) {
	_o.on_roomend();
	if (!_o.persistent) return;
	tu_persist.push(_o);
	instance_deactivate(_o);
}
function tu_room_switchto(_dest) {
	tu_persist = [];
	instance_foreach(tu_room_switchto_);
	room_current = _dest;
	tu_room_to_go = null;
	room_current.start();
}
// @1.0.0 Global step event
function tu_step() {
	// object step events:
	tu_trash = [];
	var tu_deptho, tu_depthl, _obj_, _objd_, _h, _v;
	for (tu_depthd in tu_depth) {
		tu_depthc = tu_depth[tu_depthd];
		tu_depthl = tu_depthc.length;
		for (tu_deptho = 0; tu_deptho < tu_depthl; tu_deptho++) {
			_obj_ = tu_depthc[tu_deptho];
			// is viewport object?
			if (room_viewport_object != null && tu_viewport_inst == null && (_obj_.object_index == room_viewport_object || _obj_.parent == room_viewport_object)) {
				tu_viewport_inst = _obj_;
			}
			// step events:
			_obj_.on_step();
			// move object:
			if (_obj_.speed != 0) {
				_objd_ = _obj_.direction * tu_d2r;
				_obj_.x += _obj_.speed * Math.cos(_objd_);
				_obj_.y += _obj_.speed * Math.sin(_objd_);
			}
			// post-step events:
			_obj_.on_collision();
			_obj_.on_end_step();
			// post:
			_obj_.xprevious = _obj_.x;
			_obj_.yprevious = _obj_.y;
		}
	}
	// follow object
	if (tu_viewport_inst != null) {
		_h = min(room_viewport_hborder, room_viewport_width / 2);
		_v = min(room_viewport_vborder, room_viewport_height / 2);
		// hborder:
		if (tu_viewport_inst.x < room_viewport_x + _h) room_viewport_x = tu_viewport_inst.x - _h;
		if (tu_viewport_inst.x > room_viewport_x + room_viewport_width - _h) room_viewport_x = tu_viewport_inst.x - room_viewport_width + _h;
		// vborder:
		if (tu_viewport_inst.y < room_viewport_y + _v) room_viewport_y = tu_viewport_inst.y - _v;
		if (tu_viewport_inst.y > room_viewport_y + room_viewport_height - _v) room_viewport_y = tu_viewport_inst.y - room_viewport_height + _v;
		// limits:
		room_viewport_x = Math.max(0, Math.min(room_viewport_x, room_width - room_viewport_width)) >> 0;
		room_viewport_y = Math.max(0, Math.min(room_viewport_y, room_height - room_viewport_height)) >> 0;
	}
}

function tu_draw() {
	// clear canvas:
	if (room_background_color_show) {
		tu_canvas.width = tu_canvas.width;
		tu_canvas.height = tu_canvas.height;
		// set background color:
		tu_canvas.style.backgroundColor = "rgb(" + room_background_color_red + "," + room_background_color_green + "," + room_background_color_blue + ")";
	}
	tu_render_back();
	tile_layer_last = 0;
	var tu_depthc, tu_depthv, tu_deptho, tu_depthl, _obj_;
	for (tu_depthd in tu_depth) {
		tu_depthc = tu_depth[tu_depthd];
		tu_depthv = tu_depthi[tu_depthd];
		for (; tu_tilesi[tile_layer_last] >= tu_depthv && tile_layer_last < tu_tiles.length; tile_layer_last++)
		{
			tile_lrender(tu_tiles[tile_layer_last]);
		}
		tu_depthl = tu_depthc.length;
		for (tu_deptho = 0; tu_deptho < tu_depthl; tu_deptho++) {
			_obj_ = tu_depthc[tu_deptho];
			if (_obj_.visible) _obj_.on_draw();
			_obj_.on_animationend();
		}
	}
	// render remaining tile layers:
	for (; tile_layer_last < tu_tiles.length; tile_layer_last++) {
		tile_lrender(tu_tiles[tile_layer_last]);
	}
}

function tu_prestep() {
	// clear mouse states and keypressed / keyrelesed statuses
	mouse_pressed = false;
	mouse_released = false;
	var _k, _r, _obj_;
	for (_k = 0; _k < tu_keys_pressed.length; _k++) key_pressed[tu_keys_pressed[_k]] = false;
	for (_k = 0; _k < tu_keys_released.length; _k++) key_released[tu_keys_released[_k]] = false;
	tu_keys_pressed = [];
	tu_keys_released = [];
	// remove objects from destroy stack
	for (_r = 0; _r < tu_trash.length; _r++) {
		_obj_ = tu_trash[_r];
		if (tu_modal == _obj_) tu_modal = null;
		_obj_.depth = undefined;
		tu_type_delete(_obj_, _obj_._object_index_);
		if (_obj_.parent != null) tu_type_delete(_obj_, _obj_.parent._object_index_);
		_obj_.on_destroy();
	}
}

function tu_loop() {
	// calculate render time
	tu_frame_time = tu_gettime();
	tu_elapsed = (tu_frame_time - tu_prev_frame_time);
	tu_frame_step += tu_elapsed;
	tu_frame_el += tu_elapsed;
	// continue game with the UN-Pause key
	if (tu_paused && keyboard_check_pressed(tu_unpausekey)) tu_paused = false;
	//
	if (tu_room_to_go != null && tu_canvas == null) tu_room_switchto(tu_room_to_go);
	// render game:
	if (tu_frame_step >= 1000 / room_speed && tu_loading == 0 && tu_canvas != null && !tu_paused) {
		tu_frame_count++;
		tu_elapsed = tu_frame_time - tu_prev_cycle_time;
		tu_prev_cycle_time = tu_frame_time;
		tu_frame_step -= 1000 / room_speed;
		if (tu_frame_step < 0 || tu_frame_step > 1024) tu_frame_step = 0;
		// start next room, if any:
		if (tu_room_to_go != null) tu_room_switchto(tu_room_to_go);
		//
		tu_redraw = tu_redraw_auto;
		if (tu_modal != null) {
			tu_modal.on_step();
			if (tu_modal != null) tu_modal.on_end_step();
		} else tu_step();
		tu_depth_update();
		if (tu_redraw) {
			if (tu_modal == null || tu_modaldraw) tu_draw();
			else tu_modal.on_draw();
		}
		tu_depth_update();
		tu_prestep();
		tu_depth_update();
	} else if (tu_loading > 0) tu_preloader();
	// calculate fps:
	if (tu_frame_el >= Math.floor(200 / room_speed) * 5 * room_speed)
	{
		fps = Math.ceil(tu_frame_count * 1000 / tu_frame_el);
		if (fps > room_speed) fps = room_speed;
		tu_frame_el = tu_frame_count = 0;
	}
	// repeat
	tu_prev_frame_time = tu_frame_time;
	setTimeout(tu_gameloop, 5);
}
tu_init();

/***********************************************************************
 * EXTENSIONS
 ***********************************************************************/


/***********************************************************************
 * SPRITES
 ***********************************************************************/
function __sprite_turtle_left() { 
__sprite_init__(this, sprite_turtle_left, 85, 70, 42, 35, 'Box', 28, 5, 25, 32, 52, ['img/sprite_turtle_left_3.png','img/sprite_turtle_left_4.png','img/sprite_turtle_left_5.png']);
}; var sprite_turtle_left = new __sprite_turtle_left();

function __sprite_turtle_right() { 
__sprite_init__(this, sprite_turtle_right, 85, 70, 42, 35, 'Box', 28, 60, 80, 32, 52, ['img/sprite_turtle_right_0.png','img/sprite_turtle_right_1.png','img/sprite_turtle_right_2.png']);
}; var sprite_turtle_right = new __sprite_turtle_right();

function __sprite_food_medium() { 
__sprite_init__(this, sprite_food_medium, 65, 42, 32, 21, 'Circle', 18, 0, 100, 0, 65, ['img/sprite_food_medium_48.png','img/sprite_food_medium_29.png','img/sprite_food_medium_13.png','img/sprite_food_medium_1.png','img/sprite_food_medium_0.png','img/sprite_food_medium_11.png','img/sprite_food_medium_17.png','img/sprite_food_medium_12.png','img/sprite_food_medium_25.png','img/sprite_food_medium_30.png','img/sprite_food_medium_34.png','img/sprite_food_medium_42.png','img/sprite_food_medium_35.png','img/sprite_food_medium_3.png','img/sprite_food_medium_23.png','img/sprite_food_medium_44.png','img/sprite_food_medium_6.png','img/sprite_food_medium_9.png','img/sprite_food_medium_2.png','img/sprite_food_medium_47.png','img/sprite_food_medium_49.png','img/sprite_food_medium_7.png','img/sprite_food_medium_40.png','img/sprite_food_medium_8.png','img/sprite_food_medium_10.png','img/sprite_food_medium_18.png','img/sprite_food_medium_20.png','img/sprite_food_medium_45.png','img/sprite_food_medium_33.png','img/sprite_food_medium_4.png','img/sprite_food_medium_19.png','img/sprite_food_medium_21.png','img/sprite_food_medium_22.png','img/sprite_food_medium_38.png','img/sprite_food_medium_46.png','img/sprite_food_medium_15.png','img/sprite_food_medium_37.png','img/sprite_food_medium_28.png','img/sprite_food_medium_41.png','img/sprite_food_medium_26.png','img/sprite_food_medium_16.png','img/sprite_food_medium_39.png']);
}; var sprite_food_medium = new __sprite_food_medium();

function __sprite_turtle_to_right() { 
__sprite_init__(this, sprite_turtle_to_right, 85, 70, 42, 35, 'Box', 42, 38, 58, 32, 52, ['img/sprite_turtle_to_right_0.png','img/sprite_turtle_to_right_1.png','img/sprite_turtle_to_right_2.png','img/sprite_turtle_to_right_3.png']);
}; var sprite_turtle_to_right = new __sprite_turtle_to_right();

function __sprite_turtle_to_left() { 
__sprite_init__(this, sprite_turtle_to_left, 85, 70, 42, 35, 'Box', 42, 26, 46, 32, 52, ['img/sprite_turtle_to_left_0.png','img/sprite_turtle_to_left_1.png','img/sprite_turtle_to_left_2.png','img/sprite_turtle_to_left_3.png']);
}; var sprite_turtle_to_left = new __sprite_turtle_to_left();

function __sprite_pop() { 
__sprite_init__(this, sprite_pop, 64, 72, 32, 36, 'Circle', 16, 0, 242, 0, 272, ['img/sprite_pop_0.png','img/sprite_pop_1.png','img/sprite_pop_2.png','img/sprite_pop_3.png','img/sprite_pop_4.png']);
}; var sprite_pop = new __sprite_pop();

function __sprite_worm_left() { 
__sprite_init__(this, sprite_worm_left, 70, 55, 35, 18, 'Box', 350, 30, 40, 7, 45, ['img/sprite_worm_left_0.png','img/sprite_worm_left_1.png','img/sprite_worm_left_2.png','img/sprite_worm_left_3.png','img/sprite_worm_left_4.png','img/sprite_worm_left_5.png','img/sprite_worm_left_6.png','img/sprite_worm_left_7.png','img/sprite_worm_left_8.png','img/sprite_worm_left_9.png','img/sprite_worm_left_10.png','img/sprite_worm_left_11.png','img/sprite_worm_left_12.png','img/sprite_worm_left_13.png','img/sprite_worm_left_14.png','img/sprite_worm_left_15.png','img/sprite_worm_left_16.png','img/sprite_worm_left_17.png','img/sprite_worm_left_18.png','img/sprite_worm_left_19.png','img/sprite_worm_left_20.png','img/sprite_worm_left_21.png','img/sprite_worm_left_22.png','img/sprite_worm_left_23.png','img/sprite_worm_left_24.png','img/sprite_worm_left_25.png','img/sprite_worm_left_26.png','img/sprite_worm_left_27.png']);
}; var sprite_worm_left = new __sprite_worm_left();

function __sprite_worm_right() { 
__sprite_init__(this, sprite_worm_right, 70, 55, 35, 18, 'Box', 35, 30, 40, 7, 45, ['img/sprite_worm_right_0.png','img/sprite_worm_right_1.png','img/sprite_worm_right_2.png','img/sprite_worm_right_3.png','img/sprite_worm_right_4.png','img/sprite_worm_right_5.png','img/sprite_worm_right_6.png','img/sprite_worm_right_7.png','img/sprite_worm_right_8.png','img/sprite_worm_right_9.png','img/sprite_worm_right_10.png','img/sprite_worm_right_11.png','img/sprite_worm_right_12.png','img/sprite_worm_right_13.png','img/sprite_worm_right_14.png','img/sprite_worm_right_15.png','img/sprite_worm_right_16.png','img/sprite_worm_right_17.png','img/sprite_worm_right_18.png','img/sprite_worm_right_19.png','img/sprite_worm_right_20.png','img/sprite_worm_right_21.png','img/sprite_worm_right_22.png','img/sprite_worm_right_23.png','img/sprite_worm_right_24.png','img/sprite_worm_right_25.png','img/sprite_worm_right_26.png','img/sprite_worm_right_27.png']);
}; var sprite_worm_right = new __sprite_worm_right();

function __sprite_turtle_left_2() { 
__sprite_init__(this, sprite_turtle_left_2, 85, 70, 42, 35, 'Box', 42, 5, 25, 32, 52, ['img/sprite_turtle_left_2_0.png','img/sprite_turtle_left_2_1.png','img/sprite_turtle_left_2_2.png']);
}; var sprite_turtle_left_2 = new __sprite_turtle_left_2();

function __sprite_turtle_right_2() { 
__sprite_init__(this, sprite_turtle_right_2, 85, 70, 42, 35, 'Box', 42, 60, 80, 32, 52, ['img/sprite_turtle_right_2_0.png','img/sprite_turtle_right_2_1.png','img/sprite_turtle_right_2_2.png']);
}; var sprite_turtle_right_2 = new __sprite_turtle_right_2();

function __sprite_turtle_to_right_2() { 
__sprite_init__(this, sprite_turtle_to_right_2, 85, 70, 42, 35, 'Box', 42, 38, 58, 32, 52, ['img/sprite_turtle_to_right_2_0.png','img/sprite_turtle_to_right_2_1.png','img/sprite_turtle_to_right_2_2.png','img/sprite_turtle_to_right_2_3.png']);
}; var sprite_turtle_to_right_2 = new __sprite_turtle_to_right_2();

function __sprite_turtle_to_left_2() { 
__sprite_init__(this, sprite_turtle_to_left_2, 85, 70, 42, 35, 'Box', 42, 26, 46, 32, 52, ['img/sprite_turtle_to_left_2_0.png','img/sprite_turtle_to_left_2_1.png','img/sprite_turtle_to_left_2_2.png','img/sprite_turtle_to_left_2_3.png']);
}; var sprite_turtle_to_left_2 = new __sprite_turtle_to_left_2();



/***********************************************************************
 * SOUNDS
 ***********************************************************************/
function __sound_bite() { 
__audio_init__(this, sound_bite, 'aud/Bite-SoundBible.com-2056759375.wav', '', '');
}; var sound_bite = new __sound_bite();

function __sound_slurping() { 
__audio_init__(this, sound_slurping, 'aud/Slurping 2-SoundBible.com-1269549524.wav', '', '');
}; var sound_slurping = new __sound_slurping();

function __sound_caught() { 
__audio_init__(this, sound_caught, 'aud/Swoosh 3-SoundBible.com-1573211927.wav', '', '');
}; var sound_caught = new __sound_caught();



/***********************************************************************
 * MUSICS
 ***********************************************************************/
function __music_background() { 
__audio_init__(this, music_background, '', 'aud/Pikmin 2 Perplexing Pool - Jazz Cover  insaneintherainmusic.mp3', '');
}; var music_background = new __music_background();



/***********************************************************************
 * BACKGROUNDS
 ***********************************************************************/
function __background_ocean_1() { 
__background_init__(this, background_ocean_1, 'img/Ocean_1.jpg')}; var background_ocean_1 = new __background_ocean_1();



/***********************************************************************
 * FONTS
 ***********************************************************************/
function __font_score() { 
__font_init__(this, font_score, 'Arial', 24, 1, 0)}; var font_score = new __font_score();

function __font_game_over() { 
__font_init__(this, font_game_over, 'Impact', 48, 1, 0)}; var font_game_over = new __font_game_over();



/***********************************************************************
 * OBJECTS
 ***********************************************************************/
function __object_turtle() {
__instance_init__(this, object_turtle, null, 1, 0, sprite_turtle_left, 1, 0);
this.on_creation = function() {
with(this) {
this.hspeed = 0;
this.vspeed = 0;
this.image_speed = .2;
this.caught = false;
this.recovering = false;
this.recover_timer = 0;

this.restart_x = x;
this.restart_y = y;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (caught) {
y -= global.caughtspeed;
if (y <= - global.htopcaught) {
		caught = false;
		recovering = true;
		recover_timer = 60;
		
		if (instance_number(object_game_master_one_player) > 0) {
			global.lives -= 1;
			if (global.lives <= 0){
				instance_create(0,0,object_game_over);
				instance_destroy();
			}
		}	
		if ((instance_number(object_game_master_two_player) > 0) && (global.game_timer > 0))
			global.score_1 = floor(global.score_1 / 2)
		
		x = restart_x;
		y = restart_y;
		hspeed = 0;
		vspeed = 0;
		
	}
return;
}

if (recovering) {
recover_timer -= 1;
if (recover_timer <= 0)
	recovering = false;
}

if (keyboard_check(vk_left)) {
	hspeed = max(-7, hspeed - 1);
	if (sprite_index != sprite_turtle_left) {
		if (hspeed <= 1 ) {
			if (hspeed <= -3) {
				sprite_index = sprite_turtle_left;
			}
			else {
				sprite_index = sprite_turtle_to_left;
			}
		}
	}
}

if (keyboard_check(vk_right)) {
	hspeed = min(7, hspeed + 1);
	if (sprite_index != sprite_turtle_right) {
		if (hspeed >= -1 ) {
			if (hspeed >= 3) {
				sprite_index = sprite_turtle_right;
			}
			else {
				sprite_index = sprite_turtle_to_right;
			}
		}
	}

}

if (keyboard_check(vk_up)) {
	vspeed = max(-7, vspeed - 2);
}

if (keyboard_check(vk_down)) {
	vspeed = min(7, vspeed + 2);
}

if (hspeed < 0) {
	hspeed += .3;
}

if (hspeed > 0) {
	hspeed -= .3;
}

if (vspeed < 0) {
	vspeed += .3;
}

if (vspeed > 0) {
	vspeed -= .3;
}

x = x + Math.round(hspeed);
y = y + Math.round(vspeed);

global.hspeed_1 = this.hspeed;
global.vspeed_1 = this.vspeed;

//stop at edges
if (x < sprite_index.xoffset - global.wleft) x = xprevious;
if (x > room_width + global.wright- sprite_index.xoffset) x = xprevious;
if (y < sprite_index.yoffset - global.htop) y = yprevious;
if (y > room_height + global.hbottom - sprite_index.yoffset) y = yprevious;

//WRAP
//if (x < -global.wleft) x += global.wtotal;
//if (x > room_width + global.wright) x -= global.wtotal;
//if (y < -global.htop) y += global.htotal;
//if (y > room_height + global.hbottom) y -= global.htotal;
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, object_food);
if(this.other != null) {
if ((other.eaten == 0) && ! this.caught) {
	
	if(other.image_index >= 34)
		sound_play(sound_slurping);
	else
		sound_play(sound_bite);

	if (global.game_timer > 0) {
		global.score_1 += 1;
		global.last_food_1 = other.image_index;
	}
	
	other.eaten = 1;
	other.speed = 0;
	pop = instance_create(other.x,other.y,object_pop);
	pop.follow = 2;

	//Pause briefly
	self.hspeed = 0;
	self.vspeed = 0;
}
}
this.other = this.place_meeting(this.x, this.y, object_worm);
if(this.other != null) {
if (! this.caught && !this.recovering && !other.eaten){
	this.caught = true;
	other.eaten = true;
	if ((x < room_width) && (x > 0))
		restart_x = x;
	if ((y < room_height) && (y > 0))
		restart_y = y;
	
	hspeed = 0;
	vspeed = 0;
	x = other.x;
	y = other.y;
	sound_play(sound_caught);
}


}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
if (recovering) {
	draw_sprite_ext(sprite_index, image_index, this.x, this.y, 1,1, 0,0.3 + 0.3* (recover_timer % 3))
}
else {
	if (caught){
		if(sprite_index == sprite_turtle_left || sprite_index == sprite_turtle_to_left )
			draw_sprite_ext(sprite_turtle_left, image_index, this.x + 20, this.y + 25, 1,1,300,.6);
		if(sprite_index == sprite_turtle_right || sprite_index == sprite_turtle_to_right)
			draw_sprite_ext(sprite_turtle_right, image_index, this.x - 20 , this.y + 25, 1,1,60,.6);
	}
	else {
	draw_set_alpha(1);
	draw_sprite(sprite_index, image_index, this.x, this.y)
	}
}

}
}
};
}; var object_turtle = new __object_turtle();

function __object_food() {
__instance_init__(this, object_food, null, 1, -2, sprite_food_medium, 1, 1);
this.on_creation = function() {
with(this) {
image_speed = 0;
image_index = irandom(42);

a_speed = irandom(2) + 2
b_speed = irandom(2) 
this.max_speed = max(a_speed, b_speed)
this.min_speed = min(a_speed, b_speed) 

a_interval = irandom(30) + 30
b_interval = irandom(15) + 15
this.max_interval = max(a_interval, b_interval)
this.min_interval = min(a_interval, b_interval) 

direction = 190 + irandom(159);

this.rotation_speed = irandom(3) - 2;
image_angle = (irandom(120) - 60) % 360;
this.timer = 0;

this.eaten = 0;
this.eatentimer = 5;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
image_speed = 0;

if (eaten > 0){
	this.image_alpha = .10 + eatentimer *.15;
	if (eaten == 1){
		x += global.hspeed_1;
		y += global.vspeed_1;
	}
	else {
		x += global.hspeed_2;
		y += global.vspeed_2;
	}
	if (eatentimer <= 0) {
		instance_destroy();
	}
	else {
		eatentimer -= 1;
	}
	return;
}

if (timer <=0) {

	speed = min_speed + irandom(max_speed - min_speed);
	
	prev_direction = direction;
	direction = prev_direction + 31 - irandom(60);

	while ((direction >= 350) || (direction <=190)) {
		direction = prev_direction + 31 - irandom(60);	
	}

	prev_rot = rotation_speed;
	rotation_speed = prev_rot - 1 + irandom(2);

	while ((rotation_speed >= 3) || (rotation_speed <= -3)) {
		rotation_speed = prev_rot - 1 + irandom(2);
	}
	
	timer = min_interval + irandom(max_interval - min_interval);
}
else {
	timer -= 1;
}
if(timer % 2 == 1) {
	image_angle = (image_angle + rotation_speed)% 360;
	if (image_angle > 60 && image_angle < 300)
		rotation_speed = - rotation_speed 
}

//Wrap around horizontally
if (x < -global.wleftfood) x += global.wtotalfood;
if (x > room_width + global.wrightfood) x -= global.wtotalfood;

if (y > room_height + global.hbottomfood) instance_destroy();
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var object_food = new __object_food();

function __object_game_master_one_player() {
__instance_init__(this, object_game_master_one_player, null, 1, -5, null, 1, 2);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {

if (food_timer <= 0) {
	instance_create(global.wleftfood + irandom(room_width - 2 * global.wleftfood),-global.htopfood, object_food);
	food_timer = 25 + irandom(25);
} 
else {
	food_timer -= 1;
}
	
if (global.lives > 0){
	if (worm_timer <= 0) {
		instance_create(irandom(room_width),-global.htopworm + 1, object_worm);
		worm_timer = 240 + 45 * instance_number(object_worm) //240 + irandom(60);
	} 
	else {
		worm_timer -= 1;
	}
}

if(keyboard_check_pressed(vk_escape))
	room_goto_first();
	//document.location.reload();
if(keyboard_check_pressed(vk_p))
	pause_game(vk_p);
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = function() {
with(this) {
sound_loop(music_background);

global.hspeed_1 = 0;
global.vspeed_1 = 0;

global.wleft = 12;
global.wright = 12;
global.wtotal = room_width + global.wleft + global.wright;


global.htop = 12;
global.hbottom = 12;
global.htotal = room_height + global.htop+ global.hbottom;

global.htopcaught = 100;
global.caughtspeed = 6;

global.wleftfood = 32;
global.wrightfood = 32;
global.wtotalfood = room_width + global.wleftfood + global.wrightfood;

global.htopfood = 16;
global.hbottomfood = 16;
global.htotalfood = room_height + global.htopfood + global.hbottomfood;

global.wleftworm = 12;
global.wrightworm = 12;
global.wtotalworm = room_width + global.wleftfood + global.wrightfood;

global.htopworm = 36;
global.hbottomworm = 12;
global.htotalworm = room_height + global.htopfood + global.hbottomfood;

global.score_1 = 0;
global.last_food_1 = 0;

global.lives = 3;

worm_timer = 300;
food_timer = 80;

instance_create(0,0,object_ready_start);
instance_create(room_width/2,room_height/2 - 50, object_turtle);

global.game_timer = 1;

}
};
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
draw_set_color(255,255,255)
draw_set_alpha(.7);
draw_rectangle(room_width/2-100,room_height,room_width/2+100, room_height - 42)

draw_set_alpha(1);
draw_sprite(sprite_food_medium, global.last_food_1,room_width/2 - 32, room_height-21)

draw_set_font(font_score);
draw_set_valign(fa_middle);

draw_set_color(55,200,100);
draw_set_halign(fa_right);
draw_text(room_width/2-60,room_height-15, global.score_1);

for(var i = 1; i <= global.lives; i++) {
	draw_sprite_ext(sprite_turtle_left,0,room_width/2 + 24* i,room_height - 21,.5,.5,0,1)
}
}
}
};
}; var object_game_master_one_player = new __object_game_master_one_player();

function __object_pop() {
__instance_init__(this, object_pop, null, 1, -2, sprite_pop, 1, 3);
this.on_creation = function() {
with(this) {
self.timer = 4;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (timer == 0){
	instance_destroy();
}
else {
	timer -= 1;
}
if (follow == 1) {
	x += global.hspeed_1;
	y += global.vspeed_1;
}
else {
	x += global.hspeed_2;
	y += global.vspeed_2;
}

}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var object_pop = new __object_pop();

function __object_worm() {
__instance_init__(this, object_worm, null, 1, -1, sprite_worm_left, 1, 4);
this.on_creation = function() {
with(this) {
image_speed = .2;

this.hspeed = irandom(6);
this.vspeed = irandom(5);

//Random horizontal direction, but vertical motion is DOWN to start
flip = irandom(2);
if (flip == 1) this.hspeed = -this.hspeed;

this.max_interval = 150
this.min_interval =45 

this.timer = 0;

this.eaten = false;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (eaten){
	y -= global.caughtspeed;
	if (y < -global.htopworm) {
		instance_destroy();
	}
	return;
}

if (timer <=0) {

	prev_hspeed = hspeed;
	hspeed = irandom(3) + 1;
	hspeed = hspeed * sign(prev_hspeed);
	flip = irandom(3);
	if (flip == 1) hspeed = -hspeed;
	
	prev_vspeed = vspeed;
	vspeed = irandom(3) + 1;
	vspeed = vspeed * sign(prev_vspeed)
	flip = irandom(3);
	if (flip == 1) vspeed = -vspeed;

	timer = min_interval + irandom(max_interval - min_interval);
}
else {
	timer -= 1;
}

x += hspeed;
y += vspeed;

out = false;
//bounce at edges, restart timer
if (x < -global.wleftworm){
	out = true;
	hspeed = abs(hspeed);
}
if (x > room_width + global.wrightworm) {
	out = true;
	hspeed = -abs(hspeed);
}
if (y < -global.htopworm){
	out = true;
	vspeed = abs(vspeed);
}
if  (y > room_height + global.hbottomworm) {	
	out = true;
	vspeed = -abs(vspeed);
}
if (out) {
	x = xprevious;
	y = yprevious;
	timer = min_interval + irandom(max_interval - min_interval);
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
draw_set_color(150,150,150);
draw_set_alpha(.5);
draw_rectangle(this.x-1,this.y,this.x+1,this.y-room_height)
draw_set_alpha((eaten) ? 0.5 : 1);
if(hspeed > 0)
	draw_sprite(sprite_worm_right, image_index, this.x, this.y)
else
	draw_sprite(sprite_worm_left, image_index, this.x, this.y)
}
}
};
}; var object_worm = new __object_worm();

function __object_game_master_two_player() {
__instance_init__(this, object_game_master_two_player, null, 1, -5, null, 1, 5);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (food_timer <= 0) {
	instance_create(irandom(room_width),-global.htopfood, object_food);
	food_timer = 20 + irandom(20);
} 
else {
	food_timer -= 1;
}

if (worm_timer <= 0) {
	instance_create(irandom(room_width),-global.htopworm + 1, object_worm);
	worm_timer = 240 + 30 * instance_number(object_worm) //240 + irandom(60);
} 
else {
	worm_timer -= 1;
}

if(keyboard_check_pressed(vk_escape))
	room_goto_first();

if (global.game_timer >= 1) {		
	global.game_timer -= 1;
	if(global.game_timer == 1) 
		instance_create(0,0,object_winner);
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = function() {
with(this) {
sound_loop(music_background);

global.hspeed_1 = 0;
global.vspeed_1 = 0;

global.hspeed_2 = 0;
global.vspeed_2 = 0;

global.wleft = 12;
global.wright = 12;
global.wtotal = room_width + global.wleft + global.wright;


global.htop = 12;
global.hbottom = 12;
global.htotal = room_height + global.htop+ global.hbottom;

global.htopcaught = 100;
global.caughtspeed = 6;

global.wleftfood = 32;
global.wrightfood = 32;
global.wtotalfood = room_width + global.wleftfood + global.wrightfood;

global.htopfood = 16;
global.hbottomfood = 16;
global.htotalfood = room_height + global.htopfood + global.hbottomfood;

global.wleftworm = 12;
global.wrightworm = 12;
global.wtotalworm = room_width + global.wleftfood + global.wrightfood;

global.htopworm = 36;
global.hbottomworm = 12;
global.htotalworm = room_height + global.htopfood + global.hbottomfood;

global.score_1 = 0;
global.score_2 = 0;

global.last_food_1 = 0;
global.last_food_2 = 0;

worm_timer = 240;
food_timer = 80;

instance_create(0,0,object_ready_start);
instance_create(2* room_width/3,room_height/2 - 50, object_turtle);
instance_create(room_width/3,room_height/2 - 50, object_turtle_2);

global.game_timer = 30 * 60 * 3 + 29;



}
};
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
draw_set_color(255,255,255)
draw_set_alpha(.7);
draw_rectangle(room_width/2-150,room_height,room_width/2+150, room_height - 42)
draw_set_color(0,0,0)
draw_rectangle(room_width/2-50,room_height,room_width/2+50, room_height - 42)

draw_set_alpha(1);
draw_sprite(sprite_food_medium, global.last_food_1,room_width/2 + 82, room_height-21)
draw_sprite(sprite_food_medium, global.last_food_2,room_width/2 - 82, room_height-21)

draw_set_font(font_score);
draw_set_valign(fa_middle);

draw_set_color(55,200,100);
draw_set_halign(fa_left);
draw_text(room_width/2+110,room_height-15, global.score_1);

draw_set_color(200,55,100);
draw_set_halign(fa_right);
draw_text(room_width/2-110,room_height-15, global.score_2);

draw_set_font(font_score);
draw_set_color(255,255,255)
draw_set_halign(fa_center);
s = floor(global.game_timer / 30)
m = floor(s / 60)
seconds = ((s%60) < 10) ? ("0" + (s%60)) : s%60;
//minutes = (m < 10) ? ("0" + m) : m;
draw_text(room_width/2,room_height-20,m +':'+ seconds);
//draw_text(room_width/2,room_height-15,global.game_timer);

}
}
};
}; var object_game_master_two_player = new __object_game_master_two_player();

function __object_menu_master() {
__instance_init__(this, object_menu_master, null, 1, 0, null, 1, 6);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if(keyboard_check_pressed(vk_1))
	room_goto(scene_one_player);
if(keyboard_check_pressed(vk_2))
	room_goto(scene_two_player);

}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
draw_set_font(font_game_over);
draw_set_alpha(.8);
draw_set_color(0,0,100);
draw_set_halign(fa_center);
draw_set_valign(fa_middle);
draw_text(room_width/2,room_height/2-30,"Press '1' for 1-player");
draw_text(room_width/2,room_height/2+30,"Press '2' for 2-player");
}
}
};
}; var object_menu_master = new __object_menu_master();

function __object_game_over() {
__instance_init__(this, object_game_over, null, 1, -5, null, 0, 7);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
draw_set_font(font_game_over);
draw_set_alpha(.6);
draw_set_color(155,0,25);
draw_set_halign(fa_center);
draw_set_valign(fa_middle);
draw_text(room_width/2,room_height/2,"GAME OVER");

draw_set_font(font_score);
draw_set_alpha(.6);
draw_set_color(0,0,100);
draw_set_halign(fa_center);
draw_set_valign(fa_top);
draw_text(room_width/2,room_height/2 + 30,"Press 'Esc' to return to Menu");


}
}
};
}; var object_game_over = new __object_game_over();

function __object_ready_start() {
__instance_init__(this, object_ready_start, null, 1, -5, null, 0, 8);
this.on_creation = function() {
with(this) {
this.timer = 60;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (timer > 0) 
	timer -= 1;
else
	instance_destroy();
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
draw_set_font(font_game_over);
draw_set_halign(fa_center);
draw_set_valign(fa_middle);

if(timer > 30) {
	draw_set_alpha(.6);
	draw_set_color(0,155,25);
	draw_text(room_width/2,room_height/2,"Ready...");
}
else {
	draw_set_alpha(.8);
	draw_set_color(0,200,25);
	draw_text(room_width/2,room_height/2,"START!");
}
}
}
};
}; var object_ready_start = new __object_ready_start();

function __object_turtle_2() {
__instance_init__(this, object_turtle_2, null, 1, 0, sprite_turtle_right_2, 1, 11);
this.on_creation = function() {
with(this) {
this.hspeed = 0;
this.vspeed = 0;
this.image_speed = .2;
this.caught = false;
this.recovering = false;
this.recover_timer = 0;

this.restart_x = x;
this.restart_y = y;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (caught) {
y -= global.caughtspeed;
if (y <= - global.htopcaught) {
		caught = false;
		recovering = true;
		recover_timer = 60;
		
		if ((instance_number(object_game_master_two_player) > 0) && (global.game_timer > 0))
			global.score_2 = floor(global.score_2 / 2)

		x = restart_x;
		y = restart_y;
		
		hspeed = 0;
		vspeed = 0;
	}
return;
}

if (recovering) {
recover_timer -= 1;
if (recover_timer <= 0)
	recovering = false;
}

if (keyboard_check(vk_a)) {
	hspeed = max(-7, hspeed - 1);
	if (sprite_index != sprite_turtle_left_2) {
		if (hspeed <= 1 ) {
			if (hspeed <= -3) {
				sprite_index = sprite_turtle_left_2;
			}
			else {
				sprite_index = sprite_turtle_to_left_2;
			}
		}
	}
}

if (keyboard_check(vk_d)) {
	hspeed = min(7, hspeed + 1);
	if (sprite_index != sprite_turtle_right_2) {
		if (hspeed >= -1 ) {
			if (hspeed >= 3) {
				sprite_index = sprite_turtle_right_2;
			}
			else {
				sprite_index = sprite_turtle_to_right_2;
			}
		}
	}

}

if (keyboard_check(vk_w)) {
	vspeed = max(-7, vspeed - 2);
}

if (keyboard_check(vk_s)) {
	vspeed = min(7, vspeed + 2);
}

if (hspeed < 0) {
	hspeed += .3;
}

if (hspeed > 0) {
	hspeed -= .3;
}

if (vspeed < 0) {
	vspeed += .3;
}

if (vspeed > 0) {
	vspeed -= .3;
}

x = x + Math.round(hspeed);
y = y + Math.round(vspeed);

global.hspeed_2 = this.hspeed;
global.vspeed_2 = this.vspeed;

//stop at edges
if (x < sprite_index.xoffset - global.wleft) x = xprevious;
if (x > room_width + global.wright- sprite_index.xoffset) x = xprevious;
if (y < sprite_index.yoffset - global.htop) y = yprevious;
if (y > room_height + global.hbottom - sprite_index.yoffset) y = yprevious;

//WRAP
//if (x < -global.wleft) x += global.wtotal;
//if (x > room_width + global.wright) x -= global.wtotal;
//if (y < -global.htop) y += global.htotal;
//if (y > room_height + global.hbottom) y -= global.htotal;
}
};
this.on_end_step = on_end_step_i;
this.on_collision = function() {
with(this) {
this.other = this.place_meeting(this.x, this.y, object_food);
if(this.other != null) {
if ((other.eaten == 0) && !this.caught) {
	
	if(other.image_index >= 34)
		sound_play(sound_slurping);
	else
		sound_play(sound_bite);
		
	if (global.game_timer > 0) {
		global.score_2 += 1;
		global.last_food_2 = other.image_index;
	}
	
	other.eaten = 2;
	other.speed = 0;
	pop = instance_create(other.x,other.y,object_pop);
	pop.follow = 2;
	//Pause briefly
	self.hspeed = 0;
	self.vspeed = 0;
}
}
this.other = this.place_meeting(this.x, this.y, object_worm);
if(this.other != null) {
if (!this.caught && !this.recovering && !other.eaten){
	this.caught = true;
	other.eaten = true;
	if ((x < room_width) && (x > 0))
		restart_x = x;
	if ((y < room_height) && (y > 0))
		restart_y = y;
	hspeed = 0;
	vspeed = 0;
	x = other.x;
	y = other.y;
	sound_play(sound_caught);
}


}
}
};
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
if (recovering) {
	draw_sprite_ext(sprite_index, image_index, this.x, this.y, 1,1, 0,0.3 + 0.3* (recover_timer % 3))
}
else {
	if (caught){
		if(sprite_index == sprite_turtle_left_2 || sprite_index == sprite_turtle_to_left_2 )
			draw_sprite_ext(sprite_turtle_left_2, image_index, this.x + 20, this.y + 25, 1,1,300,.6);
		if(sprite_index == sprite_turtle_right_2 || sprite_index == sprite_turtle_to_right_2)
			draw_sprite_ext(sprite_turtle_right_2, image_index, this.x - 20 , this.y + 25, 1,1,60,.6);
	}
	else {
	draw_set_alpha(1)
	draw_sprite(sprite_index, image_index, this.x, this.y)
	}
}

}
}
};
}; var object_turtle_2 = new __object_turtle_2();

function __object_particles() {
__instance_init__(this, object_particles, null, 1, 1, null, 1, 13);
this.on_creation = function() {
with(this) {
this.num_particles = 200;
this.particles_x = new Array(num_particles);
this.particles_y = new Array(num_particles);
this.particles_size = new Array(num_particles);

for(var i = 0; i < num_particles; i++){
	particles_x[i] = irandom(room_width);
	particles_y[i] = irandom(room_height);
	particles_size[i] = 1+irandom(2);
}

this.flow_direction = irandom(360)
this.flow_speed = 1 + irandom(3)

this.timer = 30;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
for(var i = 0; i < num_particles; i++) {
	particles_x[i] += Math.cos(flow_direction) * flow_speed / particles_size[i];
	particles_y[i] += Math.sin(flow_direction) * flow_speed / particles_size[i];
	if (particles_x[i] < 0) particles_x[i] +=  room_width;
	if (particles_x[i] > room_width) particles_x[i] -= room_width;
	if (particles_y[i] < 0) particles_y[i] +=  room_height;
	if (particles_y[i] > room_height) particles_y[i] -= room_height;
}

if(timer <= 0) {
	flow_speed += max(min(irandom(5)-3,5),1);
	flow_direction = (flow_direction + irandom(20) - 10) % 360;
	timer = 30 + irandom(20);
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
draw_set_color(255,255,255)
draw_set_alpha(.1)
for(var i = 0; i < num_particles; i++){
	draw_circle(particles_x[i], particles_y[i],particles_size[i]);
}


}
}
};
}; var object_particles = new __object_particles();

function __object_winner() {
__instance_init__(this, object_winner, null, 1, -5, null, 0, 17);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
draw_set_font(font_game_over);
draw_set_alpha(.7);
draw_set_halign(fa_center);
draw_set_valign(fa_middle);
if (global.score_1 > global.score_2) {
	draw_set_color(55,200,100);
	draw_text(room_width/2,room_height/2,"GREEN WINS!");
}
else if (global.score_1 < global.score_2) {
	draw_set_color(255,55,100);
	draw_text(room_width/2,room_height/2,"RED WINS!");
}
else{
	draw_set_color(105,205,255);
	draw_text(room_width/2,room_height/2,"TIE!");
}

draw_set_font(font_score);
draw_set_alpha(.6);
draw_set_color(0,0,100);
draw_set_halign(fa_center);
draw_set_valign(fa_top);
draw_text(room_width/2,room_height/2 + 30,"Press 'Esc' to return to Menu");


}
}
};
}; var object_winner = new __object_winner();



/***********************************************************************
 * SCENES
 ***********************************************************************/
function __scene_start_menu() { 
this.tiles = [
];
this.objects = [
[{o:object_menu_master, x:0, y:0}],
[{o:object_particles, x:660, y:20}]];
this.start = function() {
__room_start__(this, scene_start_menu, 960, 480, 30, 0, 0, 0, background_ocean_1.image, 0, 0, 1, 960, 480, null, 50, 50);
};
}
var scene_start_menu = new __scene_start_menu();
tu_scenes.push(scene_start_menu);
function __scene_one_player() { 
this.tiles = [
];
this.objects = [
[{o:object_game_master_one_player, x:0, y:0}],
[{o:object_particles, x:680, y:20}]];
this.start = function() {
__room_start__(this, scene_one_player, 960, 480, 30, 0, 128, 255, background_ocean_1.image, 0, 0, 1, 960, 480, null, 50, 50);
};
}
var scene_one_player = new __scene_one_player();
tu_scenes.push(scene_one_player);
function __scene_two_player() { 
this.tiles = [
];
this.objects = [
[{o:object_game_master_two_player, x:0, y:0}],
[{o:object_particles, x:640, y:20}]];
this.start = function() {
__room_start__(this, scene_two_player, 960, 480, 30, 0, 0, 0, background_ocean_1.image, 0, 0, 1, 960, 480, null, 50, 50);
};
}
var scene_two_player = new __scene_two_player();
tu_scenes.push(scene_two_player);
tu_room_to_go = scene_start_menu;


/***********************************************************************
 * CUSTOM GLOBAL VARIABLES
 ***********************************************************************/


/***********************************************************************
 * CUSTOM GLOBAL FUNCTIONS
 ***********************************************************************/



tu_gameloop = tu_loop;
tu_loop();
