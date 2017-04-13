#!/usr/bin/env python


import sys
import csv
from pathlib import Path
from slugify import slugify
from string import Template


def main():
    db_path = Path(sys.argv[1])
    tpl_path = Path(sys.argv[2])
    out_dir = Path(sys.argv[3])
    tpl_link_path = Path(sys.argv[4])
    base_url = sys.argv[5]
    if out_dir.exists() == False:
        out_dir.mkdir(parents=True)

    template = None
    with open(tpl_path.as_posix()) as f:
        template = Template(f.read())

    template_link = None
    with open(tpl_link_path.as_posix()) as f:
        template_link = Template(f.read())

    if template == None:
        raise Exception('failed to build template')
    if template_link == None:
        raise Exception('failed to build template_link')

    with open(db_path.as_posix()) as f:
        r = csv.DictReader(f)

        for row in r:
            slug = slugify(row['NOM'])

            paragraphs = '\n'.join(
            ['<p>{}</p>'.format(p) for p in row['BIOGRAPHIE'].split('\n')])
            row['BIOGRAPHIE'] = paragraphs

            image = row['IMAGE'].split('.')[0]
            row['IMAGE'] = image

            content = template.substitute(row, slug=slug, base_url=base_url)
            link = template_link.substitute(row, slug=slug, base_url=base_url)
            dest_path = out_dir.joinpath('{}.html'.format(slug))
            with open(dest_path.as_posix(), 'w') as dest:
                dest.write(content)

            print(link)


if __name__ == '__main__':
    main()
