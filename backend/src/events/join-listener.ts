/**
 * @Project voting-backend
 * @author  junho.kim
 *
 * Created by Junho Kim (junho.kim@loplat.com) on 2017. 12. 27..
 */
/// <reference path="../../typings/_all.d.ts" />


export default (socket) => {
    socket.on("join listener", () => {
        socket.join("listener");
    });
};
