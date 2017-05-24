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

            this.mapState = this.monState.map.getTile(tile2_x, tile2_y, layer2);

            this.nb_event = false;
        }
    }

    if (tile2_x && tile2_y && layer2 && this.nb_event == false) {

        // On récupére toutes les infos de la tile a la case donnée
        this.mapState = this.monState.map.getTile(tile2_x, tile2_y, layer2);

        distance = this.game.math.distance(this.mapState.worldX, this.mapState.worldY, this.x, this.y);

        if (distance < 25) {

            // Here we remove the tiles

            this.monState.map.removeTile(dtile_x, dtile_y, dlayer);

            if (dtile2_x && dtile2_y && dlayer2) this.monState.map.removeTile(dtile2_x, dtile2_y, dlayer2);

            if (dtile3_x && dtile3_y && dlayer3) this.monState.map.removeTile(dtile3_x, dtile3_y, dlayer3);

            if (dtile4_x && dtile4_y && dlayer4) this.monState.map.removeTile(dtile4_x, dtile4_y, dlayer4);

            if (dtile5_x && dtile5_y && dlayer5) this.monState.map.removeTile(dtile5_x, dtile5_y, dlayer5);

            if (dtile6_x && dtile6_y && dlayer6) this.monState.map.removeTile(dtile6_x, dtile6_y, dlayer6);

            if (dtile7_x && dtile7_y && dlayer7) this.monState.map.removeTile(dtile7_x, dtile7_y, dlayer7);

            if (dtile8_x && dtile8_y && dlayer8) this.monState.map.removeTile(dtile8_x, dtile8_y, dlayer8);


        }
    }

};