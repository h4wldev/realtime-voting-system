/**
 * @Project max-frontend
 * @author  junho.kim
 *
 * Created by Junho Kim (junho.kim@loplat.com) on 2017. 12. 13..
 */

Array.prototype.copy = function () {
    return JSON.parse(JSON.stringify(this));
};
