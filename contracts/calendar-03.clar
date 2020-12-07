(impl-trait 'ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.advent-calendar.door-trait)

(define-data-var msg-ok (string-utf8 4000) u"Today is the 3rd of December. You have managed to use the advent-calendar correctly.")
(define-data-var msg-nok (string-ascii 32) "Use advent calendar directly.")

(define-public (open)
    (if (is-eq (print contract-caller) 'ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.advent-calendar)
      (ok (print (var-get msg-ok)))
      (err (print (var-get msg-nok)))))
