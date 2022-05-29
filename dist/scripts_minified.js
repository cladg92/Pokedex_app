let pokemonRepository = (function () {
  let e = [],
    t = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  function n(t) {
    "detailsUrl" in t ? e.push(t) : console.log("pokemon is not correct");
  }
  function o(e) {
    let t = e.detailsUrl;
    return fetch(t)
      .then(function (e) {
        return e.json();
      })
      .then(function (t) {
        (e.imageUrl = t.sprites.front_default),
          (e.height = t.height),
          (e.types = t.types);
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function i(e) {
    o(e).then(function () {
      !(function (e) {
        let t = $(".modal-body"),
          n = $(".modal-title");
        n.empty(), t.empty();
        let o = $(
            "<h1>" + e.name.charAt(0).toUpperCase() + e.name.slice(1) + "</h1>"
          ),
          i = $('<img class = "modal-img" style= "width:50%">');
        i.attr("src", e.imageUrl);
        let l = $("<p>Height: " + e.height + "</p>"),
          a = document.createElement("p"),
          r = e.types;
        r.forEach(function (e) {
          if (1 == r.length) {
            let t = e.type;
            a.innerText = "Types: " + t.name;
          } else if (0 == r.indexOf(e) && r.indexOf(e) + 1 < r.length) {
            let t = e.type;
            a.innerText += "Types: " + t.name + ", ";
          } else if (r.indexOf(e) + 1 < r.length) {
            let t = e.type;
            a.innerText += t.name + ", ";
          } else {
            let t = e.type;
            a.innerText += " " + t.name;
          }
        }),
          n.append(o),
          t.append(i),
          t.append(l),
          t.append(a);
      })(e);
    });
  }
  return {
    add: n,
    getAll: function () {
      return e;
    },
    addListItem: function (e) {
      let t = document.querySelector(".pokemon-list"),
        n = document.createElement("li");
      n.classList.add(
        "list-group-item",
        "col-sm-6",
        "col-md-4",
        "col-lg-3",
        "border-0"
      );
      let o = document.createElement("button");
      (o.innerText = e.name.charAt(0).toUpperCase() + e.name.slice(1)),
        o.classList.add("button"),
        o.classList.add(
          "btn",
          "btn-dark",
          "btn-md",
          "w-100",
          "rounded-pill",
          "font-weight-bold"
        ),
        o.setAttribute("data-toggle", "modal"),
        o.setAttribute("data-target", "#exampleModal"),
        n.appendChild(o),
        t.appendChild(n),
        o.addEventListener("click", function () {
          i(e);
        });
    },
    loadList: function () {
      return fetch(t)
        .then(function (e) {
          return e.json();
        })
        .then(function (e) {
          e.results.forEach(function (e) {
            let t = { name: e.name, detailsUrl: e.url };
            n(t), console.log(t);
          });
        })
        .catch(function (e) {
          console.error(e);
        });
    },
    loadDetails: o,
    showDetails: i,
    sortList: function () {
      var e, t, n, o, i;
      for (e = document.getElementById("id01"), n = !0; n; ) {
        for (
          n = !1, o = e.getElementsByTagName("LI"), t = 0;
          t < o.length - 1;
          t++
        )
          if (
            ((i = !1),
            o[t].innerHTML.toLowerCase() > o[t + 1].innerHTML.toLowerCase())
          ) {
            i = !0;
            break;
          }
        i && (o[t].parentNode.insertBefore(o[t + 1], o[t]), (n = !0));
      }
    },
    searchPokemon: function () {
      var e, t, n, o;
      for (
        e = document.getElementById("myInput").value.toUpperCase(),
          t = document.getElementById("id01").getElementsByTagName("li"),
          o = 0;
        o < t.length;
        o++
      )
        (
          (n = t[o].getElementsByTagName("button")[0]).textContent ||
          n.innerText
        )
          .toUpperCase()
          .indexOf(e) > -1
          ? (t[o].style.display = "")
          : (t[o].style.display = "none");
    },
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (e) {
    pokemonRepository.addListItem(e);
  }),
    pokemonRepository.sortList();
});
