"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGetTocarts = exports.useTocartTools = void 0;

var _reactRedux = require("react-redux");

var _ = require("..");

var _firestore = require("firebase/firestore");

var useTocartTools = function useTocartTools(getTocarts, setUrl, setName, setPrice, tocart, addTocartBasket, addCount) {
  var dispatch = (0, _reactRedux.useDispatch)();

  var addTocart = function addTocart(price, name, url, id) {
    var basket = {
      price: price,
      name: name,
      url: url,
      count: 1,
      id: id
    };
    var findElem = tocart.findIndex(function (el) {
      return el.id === basket.id;
    });
    findElem === -1 ? dispatch(addTocartBasket(basket)) : dispatch(addCount(findElem));
  };

  var adminToolAddTocart = function adminToolAddTocart(url, name, price) {
    var keyCollection;
    return regeneratorRuntime.async(function adminToolAddTocart$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(url && name && price !== "")) {
              _context.next = 8;
              break;
            }

            keyCollection = Date.now();
            _context.next = 4;
            return regeneratorRuntime.awrap((0, _firestore.setDoc)((0, _firestore.doc)(_.db, "test", "".concat(keyCollection)), {
              url: url,
              title: name,
              price: price,
              id: keyCollection,
              comment: []
            }));

          case 4:
            setUrl("");
            setName("");
            setPrice("");
            getTocarts();

          case 8:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  return [addTocart, adminToolAddTocart];
};

exports.useTocartTools = useTocartTools;

var useGetTocarts = function useGetTocarts(removeTocart, adminAddTocart) {
  var dispatch = (0, _reactRedux.useDispatch)();

  var getTocarts = function getTocarts() {
    var q, querySnapshot;
    return regeneratorRuntime.async(function getTocarts$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dispatch(removeTocart([]));
            q = (0, _firestore.query)((0, _firestore.collection)(_.db, "test"));
            _context2.next = 4;
            return regeneratorRuntime.awrap((0, _firestore.getDocs)(q));

          case 4:
            querySnapshot = _context2.sent;
            querySnapshot.forEach(function (doc) {
              dispatch(adminAddTocart(doc.data()));
            });

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    });
  };

  var deleteTocartHome = function deleteTocartHome(id) {
    return regeneratorRuntime.async(function deleteTocartHome$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap((0, _firestore.deleteDoc)((0, _firestore.doc)(_.db, "test", "".concat(id))));

          case 2:
            getTocarts();

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    });
  };

  return {
    getTocarts: getTocarts,
    deleteTocartHome: deleteTocartHome
  };
};

exports.useGetTocarts = useGetTocarts;
//# sourceMappingURL=tocartsTools.dev.js.map
