/**
 * @Project beagle
 * @author  junho.kim
 *
 * Created by Junho Kim (junho.kim@loplat.com) on 2017. 8. 23..
 */

String.prototype.format = function () {
    const number = parseFloat(this);

    return isNaN(number) ? '0' : number.format();
};

String.prototype.kiloFormat = function (depth) {
    const number = parseFloat(this);

    return isNaN(number) ? '0' : number.kiloFormat(depth);
};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.fill = function (size, character) {
    return new Array(size - this.length + 1).join(character || '0') + this;
};

String.prototype.rightFill = function (size, character) {
    return this + new Array(size - this.length + 1).join(character || '0');
};
