(impl-trait 'ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.advent-calendar.door-trait)

(define-data-var msg (string-utf8 4000) u"Look at the logs of your node and have a nice Advent season!")
(define-read-only (open)
  (begin
(print "          .     .  .      +     .      .          .             ")
(print "     .       .      .     #       .           .                 ")
(print "        .      .         ###            .      .      .         ")
(print "      .      .   *#:. .:##*##:. .:#*  .      .                  ")
(print "          .      . *####*###*####*  .                           ")
(print "       .     *#:.    .:#*###*#:.    .:#*  .        .       .    ")
(print "  .             *#########*#########*        .        .         ")
(print "        .    *#:.  *####*###*####*  .:#*   .       .            ")
(print "     .     .  *#######**##*##**#######*                  .      ")
(print "                .*##*#####*#####*##*           .      .         ")
(print "    .   *#:. ...  .:##*###*###*##:.  ... .:#*     .             ")
(print "      .     *#######*##*#####*##*#######*      .     .          ")
(print "    .    .     *#####**#######**#####*    .      .              ")
(print "            .     *      000      *    .     .                  ")
(print "       .         .   .   000     .        .       .             ")
(print ".. .. ..................O000O........................ ...... ...")
    (ok (print (var-get msg))))
)
