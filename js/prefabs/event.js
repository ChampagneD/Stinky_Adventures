var Platformer = Platformer || {};

//Check if there is an event

Platformer.Player.prototype.trackEvents = function(tile_x, tile_y, layer, tile2_x, tile2_y, layer2, dtile_x, dtile_y, dlayer, dtile2_x, dtile2_y, dlayer2, dtile3_x, dtile3_y, dlayer3, dtile4_x, dtile4_y, dlayer4, dtile5_x, dtile5_y, dlayer5, dtile6_x, dtile6_y, dlayer6, dtile7_x, dtile7_y, dlayer7, dtile8_x, dtile8_y, dlayer8) {

    if (this.nb_event == true) {

        // On récupére toutes les infos de la tile a la case donnée
        this.mapState = this.monState.map.getTile(tile_x, tile_y, layer);

        var distance = this.game.math.distance(this.mapState.worldX, this.mapState.worldY,
            this.x, this.y);

        if (distance < 25 && this.actionKey.isDown) {

            this.monState.map.removeTile(tile_x, tile_y, layer);

            this.nb_event = false;
        }
    }

    if (tile2_x && tile2_y && layer2 && this.nb_event == false) {

        // On récupére toutes les infos de la tile a la case donnée
        this.mapState = this.monState.map.getTile(tile2_x, tile2_y, layer2);

        distance = this.game.math.distance(this.mapState.worldX, this.mapState.worldY, this.x, this.y);

        if (distance < 25) {

            // Here we remove the tiles

            return true;
        }
    }

};

Platformer.Player.prototype.eventReplaceTile = function(tile_x, tile_y, layer, dtileID, rtileID, dtileID2, rtileID2, dtileID3, rtileID3, dtileID4, rtileID4, dtileID5, rtileID5) {

    if (this.nb_event == true) {

        this.mapInfo = this.monState.map;
        this.mapState = this.mapInfo.getTile(tile_x, tile_y, layer);

        var distance = this.game.math.distance(this.mapState.worldX, this.mapState.worldY, this.x, this.y);

        if (distance < 25 && this.actionKey.isDown) {   

            this.mapInfo.replace(dtileID, rtileID, 0, 0, this.mapInfo.width, this.mapInfo.height, "collision");

            if (dtileID2 && rtileID2) this.mapInfo.replace(dtileID2, rtileID2, 0, 0, this.mapInfo.width, this.mapInfo.height, "collision");

            if (dtileID3 && rtileID3) this.mapInfo.replace(dtileID3, rtileID3, 0, 0, this.mapInfo.width, this.mapInfo.height, "collision");

            if (dtileID4 && rtileID4) this.mapInfo.replace(dtileID4, rtileID4, 0, 0, this.mapInfo.width, this.mapInfo.height, "collision");

            if (dtileID5 && rtileID5) this.mapInfo.replace(dtileID5, rtileID5, 0, 0, this.mapInfo.width, this.mapInfo.height, "collision");
            
            this.nb_event = false;

            return true;
        }
    }
};

Platformer.Player.prototype.removeTile = function(layer, dtile_x, dtile_y, dtile2_x, dtile2_y, dtile3_x, dtile3_y, dtile4_x, dtile4_y, dtile5_x, dtile5_y, dtile6_x, dtile6_y, dtile7_x, dtile7_y, dtile8_x, dtile8_y) {

    this.monState.map.removeTile(dtile_x, dtile_y, layer);

    if (dtile2_x && dtile2_y) this.monState.map.removeTile(dtile2_x, dtile2_y, layer);

    if (dtile3_x && dtile3_y) this.monState.map.removeTile(dtile3_x, dtile3_y, layer);

    if (dtile4_x && dtile4_y) this.monState.map.removeTile(dtile4_x, dtile4_y, layer);

    if (dtile5_x && dtile5_y) this.monState.map.removeTile(dtile5_x, dtile5_y, layer);

    if (dtile6_x && dtile6_y) this.monState.map.removeTile(dtile6_x, dtile6_y, layer);

    if (dtile7_x && dtile7_y) this.monState.map.removeTile(dtile7_x, dtile7_y, layer);

    if (dtile8_x && dtile8_y) this.monState.map.removeTile(dtile8_x, dtile8_y, layer);

    return true;
};