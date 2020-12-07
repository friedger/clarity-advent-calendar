(impl-trait 'ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.advent-calendar.door-trait)

(define-data-var msg-ok (string-utf8 4000) u"Today is the 6th of December.")
(define-data-var msg-nok (string-ascii 32) "Something went wrong.")

(define-public (open)
    (if
      (is-eq contract-caller 'ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.advent-calendar)
        (begin
          (print (as-max-len? (concat (var-get msg-ok) u" And St Nicolas came tonight.") u4000))
          (ok msg-ok))
        (err (print (var-get msg-nok)))))
