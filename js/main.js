var Core_Version = "20230306-0222 (Build:406)"
var show_all = "";
var diff_level_min = 0;
var diff_level_max = 23;
var diff_map = 5;
var diff_genre = 6;
var diff_version = 18;
var diff_maptype = 2;
var diff_folder = 2;
var count = 0;

function Set_Slider(obj, min, max, value)
{
    document.getElementById(obj).min = min;
    document.getElementById(obj).max = max;
    document.getElementById(obj).value = value;
}
function main()
{
    document.getElementById("text_data_version").innerHTML = "Data Version: " + Data_version;
    document.getElementById("text_core_version").innerHTML = "Core Version: " + Core_Version;

    //#region Init
    Set_Slider("slide_diff_min", 0, diff_search_level.length - 1, 0);
    Set_Slider("slide_diff_max", 0, diff_search_level.length - 1, diff_search_level.length - 1);
    Set_Slider("slide_mapdiff", 0, diff_search.length - 1, diff_search.length - 1);
    Set_Slider("slide_genre", 0, diff_search_genre.length - 1, diff_search_genre.length - 1);
    Set_Slider("slide_version", 0, diff_search_version.length - 1, diff_search_version.length - 1);
    Set_Slider("slide_maptype", 0, diff_search_maptype.length - 1, diff_search_maptype.length - 1);
    Set_Slider("slide_folder", 0, diff_search_folder.length - 1, diff_search_folder.length - 1);
    //#endregion

    diff_slider();
}
function diff_slider()
{
    count = 0;
    show_all = "";
    diff_level_min = parseInt(document.getElementById("slide_diff_min").value);
    diff_level_max = parseInt(document.getElementById("slide_diff_max").value);
    diff_map = parseInt(document.getElementById("slide_mapdiff").value);
    diff_genre = parseInt(document.getElementById("slide_genre").value);
    diff_version = parseInt(document.getElementById("slide_version").value);
    diff_maptype = parseInt(document.getElementById("slide_maptype").value);
    diff_folder = parseInt(document.getElementById("slide_folder").value);
    if (diff_level_max < diff_level_min)
    {
        document.getElementById("slide_diff_max").value = diff_level_min;
        diff_level_min = parseInt(document.getElementById("slide_diff_min").value);
        diff_level_max = parseInt(document.getElementById("slide_diff_max").value);
    }
    switch (diff_folder)
    {
        case 0://Genre
            if (diff_genre == diff_search_genre.length - 1)
            {
                for (var i = 0; i < diff_search_genre.length - 1; i++)
                {
                    count = 0;
                    show_all += "<details>";
                    for (var n = 0; n < song_data.length; n++)
                    {
                        show_all += Songbox_search(song_data[n], diff_level_min, diff_level_max, diff_map, i, diff_maptype, diff_version);
                    }
                    show_all += "<summary class='search_sub_summary'>" + diff_search_genre[i] + " (" + count + " Object)" + "</summary>";
                    show_all += "</details>";
                }
            }
            else
            {
                for (var n = 0; n < song_data.length; n++)
                {
                    show_all += Songbox_search(song_data[n], diff_level_min, diff_level_max, diff_map, diff_genre, diff_maptype, diff_version);
                }
            }
            break;
        case 1://Diff
            for (var i = diff_level_min; i <= diff_level_max; i++)
            {
                count = 0;
                show_all += "<details>";
                for (var n = 0; n < song_data.length; n++)
                {
                    show_all += Songbox_search(song_data[n], i, i, diff_map, diff_genre, diff_maptype, diff_version);
                }
                show_all += "<summary class='search_sub_summary'>Lv " + diff_search_level[i] + " (" + count + " Object)" + "</summary>";
                show_all += "</details>";
            }
            break;
        case 2://Version
            if (diff_version == diff_search_version.length - 1)
            {
                for (var i = 0; i < diff_search_version.length - 1; i++)
                {
                    count = 0;
                    show_all += "<details>";
                    for (var n = 0; n < song_data.length; n++)
                    {
                        show_all += Songbox_search(song_data[n], diff_level_min, diff_level_max, diff_map, diff_genre, diff_maptype, i);
                    }
                    show_all += "<summary class='search_sub_summary'>" + diff_search_version[i] + " (" + count + " Object)" + "</summary>";
                    show_all += "</details>";
                }
            }
            else
            {
                for (var n = 0; n < song_data.length; n++)
                {
                    show_all += Songbox_search(song_data[n], diff_level_min, diff_level_max, diff_map, diff_genre, diff_maptype, diff_version);
                }
            }
            break;
        case 3://None
            for (var i = 0; i < song_data.length; i++)
            {
                show_all += Songbox_search(song_data[i], diff_level_min, diff_level_max, diff_map, diff_genre, diff_maptype, diff_version);
            }
            break;
    }
    document.getElementById("text_slide_min").innerHTML = "最低等级显示:" + diff_search_level[diff_level_min];
    document.getElementById("text_slide_max").innerHTML = "最高等级显示:" + diff_search_level[diff_level_max];
    document.getElementById("text_slide_mapdiff").innerHTML = "难度显示:" + diff_search[diff_map];
    document.getElementById("text_slide_genre").innerHTML = "分类显示:" + diff_search_genre[diff_genre];
    document.getElementById("text_slide_version").innerHTML = "版本显示:" + diff_search_version[diff_version];
    document.getElementById("text_slide_maptype").innerHTML = "谱面类型显示:" + diff_search_maptype[diff_maptype];
    document.getElementById("text_slide_folder").innerHTML = "分类夹显示:" + diff_search_folder[diff_folder];
    document.getElementById("text_search_display").innerHTML = diff_folder == 3 ? "共有" + count + "首曲子符合要求" : "";
    document.getElementById("summary_search").innerHTML = "筛选 (" +
        diff_search_maptype[diff_maptype] + " " +
        diff_search[diff_map] + " " +
        "Lv " + diff_search_level[diff_level_min] + " / " + diff_search_level[diff_level_max] + ")";
    document.getElementById("display_area").innerHTML = show_all;
}
function Songbox_search(obj, level_min, level_max, diff, genre, map_type, map_version)
{
    console.log(obj)
    var search = [false, false, false, false, false];
    var show = "";
    show += "<div class='div_song_genre" + Genre_strToint(obj.Genre) + "'>";
    show += "<div class='div_text_genre" + Genre_strToint(obj.Genre) + "'>";
    show += "<p class='text_genre_name'>" + obj.Genre + "</p>";
    show += "<p class='text_song_id'>" + obj.ID + "</p>";
    show += "</div>";
    show += "<div class='div_song_title'>";
    show += "<p class='text_song_title'>" + obj.Name + "</p>";
    show += "<p class='text_song_subtitle'>" + obj.ArtistName + "</p>";
    //show += "<img class='song_img' src='" + Img_Cover(obj.ID) + "'/>";
    show += "</div>";
    show += "<div class='div_diff_all'>";
    if (obj.Type == "ST")
    {
        show += "<p class='icon_STD'>スタンダード</p>";
    }
    else if (obj.Type == "DX")
    {
        show += "<div class='icon_DX'>";
        show += "<p class='icon_DX_text0'>で</p>";
        show += "<p class='icon_DX_text1'>ら</p>";
        show += "<p class='icon_DX_text2'>っ</p>";
        show += "<p class='icon_DX_text3'>く</p>";
        show += "<p class='icon_DX_text4'>す</p>";
        show += "</div>";
    }
    show += "<p class='icon_ver_" + obj.Version_Number + "'>"
    + diff_search_version[obj.Version_Number] + "</p>";
    for (var n = 0; n < obj.Charts.length; n++)
    {
        show += "<div class='div_diff_" + n.toString() + "'>";
        show += "<p class='diff_" + n.toString() + "_L'>" + obj.Charts[n].Diff_str + "</p>";
        show += "<p class='diff_" + n.toString() + "_R'>" + obj.Charts[n].Diff_Detail.toFixed(1) + "</p>";
        if (diff != 5)
        {
            if (obj.Charts[n].Diff_Search_Num >= level_min && obj.Charts[n].Diff_Search_Num <= level_max && n == diff)
            {
                search[n] = true;
            }
            else
            {
                show += "<p class='diff_dark'></p>";
            }    
        }
        else if (diff == 5)
        {
            if (obj.Charts[n].Diff_Search_Num >= level_min && obj.Charts[n].Diff_Search_Num <= level_max)
            {
                search[n] = true;
            }
            else
            {
                show += "<p class='diff_dark'></p>";
            }
        }
        show += "</div>";
    }
    show += "</div>";
    show += "<details>";
    show += "<summary class='text_chart_detail'>Chart Detail</summary>";
    show += "<div class='div_chart'>";
    for (var i = 0; i < obj.Charts.length; i++)
    {
        show += `<div class='div_designer'>`;
        show += `<p class='designer_${i.toString()}'>Note Designer</p>`;
        show += `<p class='designer_white'>${obj.Charts[i].NotesDesigner}</p>`;
        
        show += `<div class='div_notes_detail'>`;

        show += `<div class='div_notes_maxCombo'>`;
        show += `<p class='notes_text_top'>Total</p>`;
        show += `<p class='notes_text_bottom'>${obj.Charts[i].NotesMaxCombo}</p>`;
        show += `</div>`;
        
        show += `<div class='div_notes_tap'>`;
        show += `<p class='notes_text_top'>Tap</p>`;
        show += `<p class='notes_text_bottom'>${obj.Charts[i].NotesTap}</p>`;
        show += `</div>`;
        
        show += `<div class='div_notes_hold'>`;
        show += `<p class='notes_text_top'>Hold</p>`;
        show += `<p class='notes_text_bottom'>${obj.Charts[i].NotesHold}</p>`;
        show += `</div>`;

        show += `<div class='div_notes_silde'>`;
        show += `<p class='notes_text_top'>Slide</p>`;
        show += `<p class='notes_text_bottom'>${obj.Charts[i].NotesSlide}</p>`;
        show += `</div>`;

        show += `<div class='div_notes_touch'>`;
        show += `<p class='notes_text_top'>Touch</p>`;
        show += `<p class='notes_text_bottom'>${obj.Charts[i].NotesTouch}</p>`;
        show += `</div>`;

        show += `<div class='div_notes_break'>`;
        show += `<p class='notes_text_top'>Break</p>`;
        show += `<p class='notes_text_bottom'>${obj.Charts[i].NotesBreak}</p>`;
        show += `</div>`;

        show += `</div>`;
        
        show += `</div>`;
    }
    show += "</div>";
    show += "</details>"
    show += "</div>";

    if (obj.Version_Number != map_version && map_version != diff_search_version.length - 1 ||
        Maptype_strToint(obj.Type) != map_type && map_type != diff_search_maptype.length - 1 ||
        Genre_strToint(obj.Genre) != genre && genre != diff_search_genre.length - 1)
    {
        return "";
    }
    if (diff != 5)
    {
        count = search[diff] ? count += 1 : count;
        return search[diff] ? show : "";
    }
    else
    {
        count = search[0] || search[1] || search[2] || search[3] || search[4] ? count += 1 : count;
        return search[0] || search[1] || search[2] || search[3] || search[4] ? show : "";
    }
}
function Genre_strToint(genre)
{
    switch (genre)
    {
        case "POPSアニメ":
        case "POPS&アニメ":
            return 0;
        case "niconicoボーカロイド":
        case "niconico&ボーカロイド":
            return 1;
        case "东方Project":
        case "東方Project":
            return 2;
        case "バラエティ":
        case "ゲームバラエティ":
        case "ゲーム&バラエティ":
            return 3;
        case "オリジナル":
        case "maimai":
            return 4;
        case "オンゲキCHUNITHM":
        case "オンゲキ&CHUNITHM":
            return 5;
        default:
            return 6;
    }
}
function Maptype_strToint(maptype)
{
    switch (maptype)
    {
        default:
        case "ST":
            return 0;
        case "DX":
            return 1;
    }
}