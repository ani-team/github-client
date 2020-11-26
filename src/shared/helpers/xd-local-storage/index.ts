import XdUtils from "./services/xd-utils"

/**
 * Created by dagan on 07/04/2014.
 */

interface xdLocalStorageAPI {
    getItem: (key: string, callback: (value: string) => void) => void;
}

/* global XdUtils */
export default (function () {
    var MESSAGE_NAMESPACE = "cross-domain-local-message";

    var defaultData = {
        namespace: MESSAGE_NAMESPACE,
    };

    function postData(id: string, data: any) {
        var mergedData = XdUtils.extend(data, defaultData);
        mergedData.id = id;
        parent.postMessage(JSON.stringify(mergedData), "*");
    }

    function getData(id: string, key: string) {
        var value = localStorage.getItem(key);
        var data = {
            key: key,
            value: value,
        };
        postData(id, data);
    }

    function setData(id: string, key: string, value: string) {
        localStorage.setItem(key, value);
        var checkGet = localStorage.getItem(key);
        var data = {
            success: checkGet === value,
        };
        postData(id, data);
    }

    function removeData(id: string, key: string) {
        localStorage.removeItem(key);
        postData(id, {});
    }

    function getKey(id: string, index: number) {
        var key = localStorage.key(index);
        postData(id, { key: key });
    }

    function getSize(id: string) {
        var size = JSON.stringify(localStorage).length;
        postData(id, { size: size });
    }

    function getLength(id: string) {
        var length = localStorage.length;
        postData(id, { length: length });
    }

    function clear(id: string) {
        localStorage.clear();
        postData(id, {});
    }

    function receiveMessage(event: any) {
        var data;
        try {
            data = JSON.parse(event.data);
        } catch (err) {
            //not our message, can ignore
        }

        if (data && data.namespace === MESSAGE_NAMESPACE) {
            if (data.action === "set") {
                setData(data.id, data.key, data.value);
            } else if (data.action === "get") {
                getData(data.id, data.key);
            } else if (data.action === "remove") {
                removeData(data.id, data.key);
            } else if (data.action === "key") {
                getKey(data.id, data.key);
            } else if (data.action === "size") {
                getSize(data.id);
            } else if (data.action === "length") {
                getLength(data.id);
            } else if (data.action === "clear") {
                clear(data.id);
            }
        }
    }

    if (window.addEventListener) {
        window.addEventListener("message", receiveMessage, false);
    } else {
        window.onmessage = receiveMessage;
    }

    function sendOnLoad() {
        var data = {
            namespace: MESSAGE_NAMESPACE,
            id: "iframe-ready",
        };
        parent.postMessage(JSON.stringify(data), "*");
    }
    //on creation
    sendOnLoad();
})() as any as xdLocalStorageAPI;
