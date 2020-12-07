(impl-trait 'ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.advent-calendar.door-trait)

(define-data-var msg-ok (string-utf8 4000) u"Today is the 7th of December.")
(define-data-var msg-nok (string-ascii 32) "Something went wrong.")

(define-public (open)
    (if (is-eq contract-caller 'ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.advent-calendar)
      (begin
        (print "last known time stamp:")
        (print (get-block-info? time (- block-height u1)))
        (ok (print (var-get msg-ok)))
      )
      (err (print (var-get msg-nok)))))
