(impl-trait 'ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.advent-calendar.door-trait)

(define-data-var msg-ok (string-utf8 4000) u"Today is the 6th of December.")
(define-data-var msg-nok (string-ascii 32) "Something went wrong.")

(define-public (open)
    (if
      (is-eq contract-caller 'ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.advent-calendar)
        (begin
          (var-set msg-ok (unwrap! (as-max-len? (concat (var-get msg-ok) u" And St Nicolas brought us biscuits.") u4000) (err "text too long")))
          (ok (print (var-get msg-ok))))
        (err (print (var-get msg-nok)))))
