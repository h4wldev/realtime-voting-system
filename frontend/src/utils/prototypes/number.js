/**
 * @Project beagle
 * @author  junho.kim
 *
 * Created by Junho Kim (junho.kim@loplat.com) on 2017. 8. 23..
 */

Number.prototype.format = function () {
    return (this === 0) ? 0 : String(this).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

Number.prototype.kiloFormat = function (depth) {
    depth = depth || 2;

    return (this < 1000) ? this : `${(this / 1000).toFixed(depth)}K`;
};

Number.prototype.fill = function (size, character) {
    return new Array(size - String(this).length + 1).join(character || '0') + this;
};
